import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogEditor } from "@/components/Blog/BlogEditor";
import { toast } from "sonner";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (blogData: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Blog submitted for review!", {
        description: "Your blog post has been submitted and is pending admin approval."
      });
      
      navigate("/my-blogs");
    } catch (error) {
      toast.error("Failed to submit blog", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = (blogData: any) => {
    // For now, just show a toast
    toast.info("Preview feature coming soon!", {
      description: "Preview functionality will be available in the next update."
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
          <p className="text-muted-foreground">
            Share your knowledge with the Devnovate community. Your post will be reviewed before publication.
          </p>
        </div>
        
        <BlogEditor 
          onSave={handleSave} 
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
}