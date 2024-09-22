import Footer from '@/components/Footer';
import Section from '@/components/Reuse/Section';
import BlogHeader from '../bolg.header/BlogHeader';
import BlogsRender from './BlogsRender';
import ImportantLink from '../ImportantLink';

const BlogMain = () => {
    return (
        <>
            <BlogHeader />
            <Section>
                <div className="row">
                    <div className="col-md-4 py-5 rounded">
                        <ImportantLink />
                    </div>
                    <div className="col-md-8 py-5">
                        <h2 className="mb-4">Latest Blogs</h2>
                        <div className="row">
                            <BlogsRender />
                        </div>
                    </div>
                </div>
            </Section>
            <Footer />
        </>
    );
};

export default BlogMain;