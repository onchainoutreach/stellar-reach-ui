import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Download,
  Upload,
  Eye,
  EyeOff,
  CheckSquare,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import leadsData from "@/data/leadsData.json";
import { useNavigate } from "react-router-dom";

interface Lead {
  id: string;
  name: string;
  position: string;
  company: string;
  type: "B2B" | "B2C";
  source: "curated" | "imported";
  image: string;
  social: {
    linkedin?: string;
    email?: string;
    twitter?: string;
    discord?: string;
    telegram?: string;
  };
  updatedYear: number;
}

const ITEMS_PER_PAGE = 12;

export const LeadsDatabase = () => {
  const navigate = useNavigate();
  const [leadType, setLeadType] = useState<"B2B" | "B2C">("B2B");
  const [sourceFilter, setSourceFilter] = useState<"all" | "imported">("all");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [hiddenLeads, setHiddenLeads] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Type assertion to ensure the JSON data matches our Lead interface
  const leads: Lead[] = leadsData.leads as Lead[];

  // Filter leads based on type, source, and hidden status
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const typeMatch = lead.type === leadType;
      const sourceMatch =
        sourceFilter === "all" || lead.source === sourceFilter;
      const notHidden = !hiddenLeads.has(lead.id);
      return typeMatch && sourceMatch && notHidden;
    });
  }, [leads, leadType, sourceFilter, hiddenLeads]);

  // Paginate filtered leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredLeads.slice(startIndex, endIndex);
  }, [filteredLeads, currentPage]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);

  const handleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedLeads.size === paginatedLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(paginatedLeads.map((lead) => lead.id)));
    }
  };

  const handleExportSelected = () => {
    const selectedLeadsData = leads.filter((lead) =>
      selectedLeads.has(lead.id)
    );
    const dataStr = JSON.stringify(selectedLeadsData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "selected_leads.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleHideSelected = () => {
    const newHidden = new Set(hiddenLeads);
    selectedLeads.forEach((leadId) => newHidden.add(leadId));
    setHiddenLeads(newHidden);
    setSelectedLeads(new Set());
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "discord":
        return <MessageCircle className="w-4 h-4" />;
      case "telegram":
        return <Phone className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getDisplayName = (lead: Lead) => {
    return leadType === "B2B" ? lead.company : lead.name;
  };

  const getDisplayPosition = (lead: Lead) => {
    return lead.position;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Leads Database</h1>
        <p className="text-muted-foreground">
          The leads database has been carefully collected manually to ensure
          quality and relevance. More Coming Soon!
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* B2C/B2B Switch */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <span
              className={`text-sm font-medium transition-colors ${
                leadType === "B2C" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              B2C
            </span>
            <Switch
              checked={leadType === "B2B"}
              onCheckedChange={(checked) =>
                setLeadType(checked ? "B2B" : "B2C")
              }
            />
            <span
              className={`text-sm font-medium transition-colors ${
                leadType === "B2B" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              B2B
            </span>
          </div>

          {/* All/User Imported Switch */}
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <span
              className={`text-sm font-medium transition-colors ${
                sourceFilter === "all"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              All
            </span>
            <Switch
              checked={sourceFilter === "imported"}
              onCheckedChange={(checked) =>
                setSourceFilter(checked ? "imported" : "all")
              }
            />
            <span
              className={`text-sm font-medium transition-colors ${
                sourceFilter === "imported"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              User Imported
            </span>
          </div>
        </div>

        {/* Total count */}
        <div className="text-sm text-muted-foreground">
          Total: {filteredLeads.length} leads
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/import-lead")}
        >
          <Upload className="w-4 h-4 mr-2" />
          Import New
        </Button>
        <Button variant="outline" size="sm" onClick={handleSelectAll}>
          <CheckSquare className="w-4 h-4 mr-2" />
          {selectedLeads.size === paginatedLeads.length
            ? "Deselect All"
            : "Select All"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportSelected}
          disabled={selectedLeads.size === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Selected ({selectedLeads.size})
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleHideSelected}
          disabled={selectedLeads.size === 0}
        >
          <EyeOff className="w-4 h-4 mr-2" />
          Hide Selected
        </Button>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedLeads.map((lead) => (
          <Card key={lead.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={lead.image} alt={getDisplayName(lead)} />
                    <AvatarFallback>
                      {getDisplayName(lead)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm whitespace-normal break-words leading-tight">
                      {getDisplayName(lead)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-normal break-words">
                      {getDisplayPosition(lead)}
                    </p>
                    {leadType === "B2C" && (
                      <p className="text-xs text-muted-foreground whitespace-normal break-words">
                        {lead.company}
                      </p>
                    )}
                  </div>
                </div>
                <Checkbox
                  checked={selectedLeads.has(lead.id)}
                  onCheckedChange={() => handleSelectLead(lead.id)}
                  className="mt-1"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Social links */}
                <div className="flex flex-wrap gap-1">
                  {Object.entries(lead.social).map(([platform, url]) => (
                    <button
                      key={platform}
                      onClick={() => window.open(url, "_blank")}
                      className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                      title={`Open ${platform}`}
                    >
                      {getSocialIcon(platform)}
                    </button>
                  ))}
                </div>

                {/* Updated year badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    Updated {lead.updatedYear}
                  </Badge>
                  {lead.source === "imported" && (
                    <Badge variant="outline" className="text-xs">
                      Imported
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
