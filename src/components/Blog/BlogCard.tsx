import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Eye, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  isLiked?: boolean;
  variant?: "default" | "featured" | "compact";
}

export const BlogCard = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  publishedAt,
  tags,
  likes,
  comments,
  views,
  isLiked = false,
  variant = "default"
}: BlogCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const cardClasses = cn(
    "blog-card group cursor-pointer overflow-hidden",
    variant === "featured" && "md:col-span-2 lg:col-span-3",
    variant === "compact" && "flex-row"
  );

  const imageClasses = cn(
    "w-full object-cover transition-transform duration-300 group-hover:scale-105",
    variant === "featured" ? "h-64 md:h-80" : "h-48",
    variant === "compact" && "h-full w-32 flex-shrink-0"
  );

  return (
    <Card className={cardClasses}>
      <Link to={`/blog/${id}`} className="block">
        {coverImage && (
          <div className={cn(
            "overflow-hidden",
            variant === "compact" ? "w-32" : "w-full"
          )}>
            <img
              src={coverImage}
              alt={title}
              className={imageClasses}
            />
          </div>
        )}
        
        <CardContent className={cn(
          "p-4",
          variant === "compact" && "flex-1"
        )}>
          {variant === "featured" && (
            <Badge variant="secondary" className="mb-2">
              Featured
            </Badge>
          )}
          
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className={cn(
            "font-semibold leading-tight mb-2 group-hover:text-primary transition-colors",
            variant === "featured" ? "text-xl md:text-2xl" : "text-lg",
            variant === "compact" && "text-base"
          )}>
            {title}
          </h3>
          
          <p className={cn(
            "text-muted-foreground line-clamp-2 mb-3",
            variant === "featured" ? "text-base" : "text-sm",
            variant === "compact" && "line-clamp-1"
          )}>
            {excerpt}
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{author.name}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className={cn(
        "px-4 pb-4 pt-0 flex items-center justify-between",
        variant === "compact" && "px-2 pb-2"
      )}>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-3 w-3" />
            <span>{comments}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center space-x-1 text-muted-foreground hover:text-primary",
            isLiked && "text-red-500 hover:text-red-600"
          )}
        >
          <Heart className={cn("h-3 w-3", isLiked && "fill-current")} />
          <span>{likes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};