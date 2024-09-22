import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EditorContent, useEditor } from '@tiptap/react';
import { Button, message, notification, Table, Tabs } from 'antd';
import AdminWrapper from '../../../AdminWrapper';

// TipTap Extensions
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlock from '@tiptap/extension-code-block';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { config } from '../../../../../../config';
import { BlogPost } from '../../../../../../types/blog';
import './Blog.css';
import { AuthContext } from '../../../../../context/AuthProvider';
import { uploadFileToFirebase } from '../../../../../../firebase';

const Blog = () => {
    return (
        <AdminWrapper>
            <BlogTopBar />
            <div className="px-1">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="View All" key="1">
                        <BlogShow />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Add New" key="2">
                        <BlogAdd />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </AdminWrapper>
    );
};

export default Blog;

const BlogTopBar = () => {
    return (
        <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
            <h5 className="text-uppercase">Blogs</h5>
            <div className="d-flex gap-2 align-items-center"></div>
        </div>
    );
};

const BlogAdd = () => {
    const globles = useContext(AuthContext)
    if (!globles) return null
    const { token } = globles

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            Bold,
            Italic,
            BulletList,
            ListItem,
            Superscript,
            Subscript,
            Strike,
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
            Highlight.configure({ multicolor: true }),
            TextStyle,
            Color,
            CodeBlock,
            Blockquote,
            OrderedList,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Start writing your blog content here...', }),
        ],
        content: '',
    });

    if (!editor) return null;

    // Handles editor format actions
    const handleFormatClick = (command: string, options?: any) => {
        switch (command) {
            case 'Bold':
                editor.chain().focus().toggleBold().run();
                break;
            case 'Italic':
                editor.chain().focus().toggleItalic().run();
                break;
            case 'Underline':
                editor.chain().focus().toggleUnderline().run();
                break;
            case 'Strike':
                editor.chain().focus().toggleStrike().run();
                break;
            case 'Heading':
                editor.chain().focus().toggleHeading({ level: options.level }).run();
                break;
            case 'BulletList':
                editor.chain().focus().toggleBulletList().run();
                break;
            case 'OrderedList':
                editor.chain().focus().toggleOrderedList().run();
                break;
            case 'Superscript':
                editor.chain().focus().toggleSuperscript().run();
                break;
            case 'Subscript':
                editor.chain().focus().toggleSubscript().run();
                break;
            case 'Blockquote':
                editor.chain().focus().toggleBlockquote().run();
                break;
            case 'CodeBlock':
                editor.chain().focus().toggleCodeBlock().run();
                break;
            case 'AlignLeft':
                editor.chain().focus().setTextAlign('left').run();
                break;
            case 'AlignCenter':
                editor.chain().focus().setTextAlign('center').run();
                break;
            case 'AlignRight':
                editor.chain().focus().setTextAlign('right').run();
                break;
            case 'Link':
                const url = prompt('Enter the URL');
                if (url) editor.chain().focus().setLink({ href: url }).run();
                break;
            case 'ClearFormat':
                editor.chain().focus().unsetAllMarks().clearNodes().run();
                break;
            default:
                break;
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) {
                message.error('File size must be less than 500KB.');
                return;
            }
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.onerror = () => {
                message.error('Error reading the file.');
            };
            reader.readAsDataURL(file);
        }
    };

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL');

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            });
        }
    };

    const handleUpload = async () => {
        if (!title.trim() || !image || !description.trim() || !file) {
            message.error('Please fill in all fields.');
            return;
        }

        setLoading(true);

        try {
            // Upload image to Firebase
            const imagePath = `blog_images/${Date.now()}_${file.name}`;
            const imageUrl = await uploadFileToFirebase(file, imagePath);
            const reqBody = {
                title: title.trim(),
                image: imageUrl,
                description: description.trim(),
                content: editor.getHTML(),
            };
            const response = await axios.post(`${config.SERVER}/blog`, reqBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                notification.success({
                    message: 'Blog created successfully',
                    description: 'Blog post created successfully.',
                });

                // Reset form fields
                setTitle('');
                setDescription('');
                setImage('');
                setFile(null); // Reset file
                editor.commands.setContent('');
            }
        } catch (error: any) {
            console.error('Error uploading blog post:', error);
            message.error(
                error.response?.data?.message || 'Failed to create blog post. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row m-0">
            <div className="col-md-6">
                <h5>Add Content</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label bold-text">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            autoFocus
                            placeholder="Enter title of blog"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label bold-text">
                            Description
                        </label>
                        <textarea
                            name="description"
                            className="form-control"
                            placeholder="Enter description of blog"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label bold-text" >
                            Image
                        </label>
                        <input name="image" className="form-control" type="file" required accept="image/*"
                            onChange={handleImageChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label bold-text">
                            Content
                        </label>
                        <div className="editor-toolbar mb-2 d-flex flex-wrap align-items-center">
                            <div className="d-flex p-1 gap-2 rounded btn btn-outline-primary">
                                <span>Text color</span>
                                <input
                                    type="color"
                                    onInput={(event) => {
                                        const target = event.target as HTMLInputElement;
                                        editor.chain().focus().setColor(target.value).run();
                                    }}
                                    value={editor.getAttributes('textStyle').color || '#000000'}
                                    data-testid="setColor"
                                />
                            </div>
                            {[
                                { label: 'Bold', format: 'Bold' },
                                { label: 'Italic', format: 'Italic' },
                                { label: 'Underline', format: 'Underline' },
                                { label: 'Strike', format: 'Strike' },
                                { label: 'H1', format: 'Heading', level: 1 },
                                { label: 'H2', format: 'Heading', level: 2 },
                                { label: 'H3', format: 'Heading', level: 3 },
                                { label: 'H4', format: 'Heading', level: 4 },
                                { label: 'H5', format: 'Heading', level: 5 },
                                { label: 'H6', format: 'Heading', level: 6 },
                                { label: 'Bullet List', format: 'BulletList' },
                                { label: 'Ordered List', format: 'OrderedList' },
                                {
                                    label: <>
                                        <span>A<sup>x</sup></span>
                                    </>, format: 'Superscript'
                                },
                                {
                                    label: <>
                                        <span>A<sub>x</sub></span>
                                    </>, format: 'Subscript'
                                },
                                { label: 'Blockquote', format: 'Blockquote' },
                                { label: 'Code Block', format: 'CodeBlock' },
                                { label: 'Align Left', format: 'AlignLeft' },
                                { label: 'Align Center', format: 'AlignCenter' },
                                { label: 'Align Right', format: 'AlignRight' },
                                { label: 'Link', format: 'Link' },
                                { label: 'Clear Formatting', format: 'ClearFormat' },
                            ].map((btn, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`btn btn-outline-primary m-1 ${editor.isActive(btn.format, btn.level ? { level: btn.level } : {}) ? 'active' : ''
                                        }`}
                                    onClick={() => handleFormatClick(btn.format, btn)}
                                >
                                    {btn.label}
                                </button>
                            ))}
                            <button type="button" className='btn btn-outline-primary m-1' onClick={addYoutubeVideo}>Add YouTube video</button>
                        </div>
                        <EditorContent editor={editor} className="editor-content" />
                    </div>
                </form>
            </div>
            <div className="col-md-6">
                <h5>Preview Content</h5>
                <div className="border p-2 preview-area">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className="d-flex justify-content-center">
                        {image && <img src={image} alt="" width="100%" loading='lazy' style={{
                            maxWidth: "500px"
                        }} />}
                    </div>
                    <div
                        className="content-preview"
                        dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                    ></div>
                </div>

                <div className="text-end mt-2">
                    <Button type='primary' onClick={handleUpload} loading={loading}>Add Blog</Button>
                </div>
            </div>
        </div>
    );
};

const BlogShow: React.FC = () => {
    const globles = useContext(AuthContext)
    if (!globles) return null
    const { token } = globles

    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchBlogs = async (pageNum: number) => {
        try {
            const response = await axios.get(`${config.SERVER}/blog?page=${pageNum}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newBlogs: BlogPost[] = response.data.blogs;

            if (newBlogs.length < 10) {
                setHasMore(false);
            }

            setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
            setLoading(false);
        } catch (error: any) {
            console.error('Error fetching blogs:', error);
            notification.error({
                message: 'Error',
                description: error.response.data.message || 'Failed to load blogs. Please try again.',
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(page);
    }, [page]);

    const loadMoreBlogs = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text: string) => <img src={text} alt="Blog" style={{ width: '100px', height: 'auto' }} />,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, data: BlogPost) => <Button type='link' danger icon={<DeleteOutlineIcon />} onClick={() => deleteBlog(data._id)} />,
        },
    ];

    async function deleteBlog(id: string) {
        try {

            const response = await axios.delete(`${config.SERVER}/blog/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setBlogs(blogs.filter((blog) => blog._id !== id));
                notification.success({
                    message: 'Success',
                    description: 'Blog post deleted successfully.',
                });
            }

        } catch (error) {

            notification.error({
                message: 'Error',
                description: 'Failed to delete blog post. Please try again.',
            });

        }
    }

    return (
        <div className='table-responsive'>
            <Table
                dataSource={blogs}
                columns={columns}
                rowKey="_id"
                pagination={false}
                loading={loading}
            />
            {hasMore && (
                <Button onClick={loadMoreBlogs} type='primary' style={{ marginTop: '20px' }}>
                    Load More
                </Button>
            )}
        </div>
    );
};