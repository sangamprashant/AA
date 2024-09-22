"use client";
import { useAppContext } from "@/context/AppProvider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "antd";
import Link from "next/link";
import SkeletonLoader from "./LoadingSkelton";

const BlogsRender = () => {
  const { blogs, blogLoading, loadMoreBlogs, hasMoreBlog } = useAppContext();

  return (
    <>
      <div className="row">
        {blogs.length > 0
          && blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card shadow-sm border-0">
                <img
                  src={blog.image}
                  className="card-img-top"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  alt={blog.title}
                  loading='lazy'
                />
                <div className="card-body">
                  <h5
                    className="card-text"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {blog.title}
                  </h5>
                  <p className="card-text">{blog.description}</p>
                  <div className="text-end mt-2">
                    <Link href={`/blog/${blog._id}`} className="btn theme-btn">
                      Read More <NavigateNextIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {blogLoading && Array.from({ length: 3 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
      {hasMoreBlog && (
        <div className="text-end mt-4">
          <Button
            onClick={loadMoreBlogs}
            disabled={blogLoading}
            loading={blogLoading}
            type="primary"
          >Load More</Button>
        </div>
      )}
    </>
  );
};

export default BlogsRender;
