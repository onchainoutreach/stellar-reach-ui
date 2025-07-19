import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Template } from "./TemplateBuilder";

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
  onCopy: (template: Template) => void;
  onCustomizeWithAI: (template: Template) => void;
  showDelete?: boolean;
}

export const TemplateCard = ({
  template,
  onEdit,
  onDelete,
  onCopy,
  onCustomizeWithAI,
  showDelete = true,
}: TemplateCardProps) => {
  const [showFullMessage, setShowFullMessage] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      onDelete(template.id);
    }
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{template.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge
                variant={
                  template.style === "professional" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {template.style}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(template.updatedAt)}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onCopy(template)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Template
              </DropdownMenuItem>
              {showDelete && (
                <DropdownMenuItem onClick={() => onEdit(template)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Template
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onCustomizeWithAI(template)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Customize with AI
              </DropdownMenuItem>
              {showDelete && (
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Template
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Message Preview:
            </p>
            <div className="text-sm bg-muted/50 rounded-lg p-3">
              <p className="whitespace-pre-wrap">
                {showFullMessage
                  ? template.message
                  : truncateText(template.message)}
              </p>
              {template.message.length > 120 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullMessage(!showFullMessage)}
                  className="mt-2 p-0 h-auto text-primary hover:no-underline"
                >
                  {showFullMessage ? "Show less" : "Show more"}
                </Button>
              )}
            </div>
          </div>

          {template.callToAction && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Call to Action:
              </p>
              <p className="text-sm font-medium">
                {truncateText(template.callToAction, 80)}
              </p>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Button
              size="sm"
              onClick={() => onCopy(template)}
              variant="outline"
              className="flex-1"
            >
              <Copy className="w-3 h-3 mr-2" />
              Use Template
            </Button>
            {showDelete && (
              <Button
                size="sm"
                onClick={() => onEdit(template)}
                variant="outline"
              >
                <Edit className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
