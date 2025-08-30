import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Eye } from "lucide-react";

interface BlogEditorProps {
  onSave?: (blogData: any) => void;
  onPreview?: (blogData: any) => void;
  initialData?: any;
}

export const BlogEditor = ({ onSave, onPreview, initialData }: BlogEditorProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'align', 'link', 'image', 'video', 'blockquote', 'code-block'
  ];

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSave = () => {
    const blogData = {
      title,
      content,
      excerpt,
      tags,
      coverImage,
      status: 'pending'
    };
    onSave?.(blogData);
  };

  const handlePreview = () => {
    const blogData = {
      title,
      content,
      excerpt,
      tags,
      coverImage
    };
    onPreview?.(blogData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title..."
              className="text-lg"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your blog post..."
              rows={3}
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <div className="flex space-x-2">
              <Input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {coverImage && (
              <div className="mt-2">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex space-x-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter tags..."
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <Label>Content</Label>
            <div className="border rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                style={{ minHeight: '300px' }}
                placeholder="Start writing your blog post..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePreview} className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            <div className="space-x-2">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={handleSave} className="btn-hero">
                Submit for Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};