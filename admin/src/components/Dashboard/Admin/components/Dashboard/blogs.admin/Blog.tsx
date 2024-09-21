'use client';

import { message, Tabs } from 'antd';
import AdminWrapper from '../../../AdminWrapper';
import { useEditor, EditorContent } from '@tiptap/react';

// TipTap Extensions
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder'
// import Youtube from '@tiptap/extension-youtube'

// Styles
import './Blog.css'; // Custom styles for buttons and editor
import { useState } from 'react';

const Blog = () => {
    return (
        <AdminWrapper>
            <BlogTopBar />
            <div className="px-1">
                <Tabs defaultActiveKey="2">
                    <Tabs.TabPane tab="View All" key="1">
                        Blog View
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

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<string | null>(null);

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
            // Check if file size is less than 500KB
            if (file.size > 500 * 1024) {
                message.error('File size must be less than 500KB.');
                return;
            }

            // Convert image to Base64
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

    };

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL');

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: 640,
                height: 480,
            });
        }
    };

    return (
        <div className="row m-0">
            <div className="col-md-6">
                <h5>Add Content</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
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
                        <label htmlFor="description" className="form-label">
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
                        <label htmlFor="image" className="form-label" >
                            Image
                        </label>
                        <input name="image" className="form-control" type="file" required accept="image/*"
                            onChange={handleImageChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Content
                        </label>
                        {/* TipTap Editor and Toolbar */}
                        <div className="editor-toolbar mb-2 d-flex flex-wrap align-items-center">
                            <input
                                type="color"
                                onInput={(event) => {
                                    const target = event.target as HTMLInputElement;
                                    editor.chain().focus().setColor(target.value).run();
                                }}
                                value={editor.getAttributes('textStyle').color || '#000000'} // Fallback to default color
                                data-testid="setColor"
                            />
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
                            <button type="button" onClick={addYoutubeVideo}>Add YouTube video</button>
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
            </div>
        </div>
    );
};
