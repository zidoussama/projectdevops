import { useState, useEffect, useRef } from "react";
import { Users, Trash2, Edit, Plus, Search, Image as ImageIcon, Loader2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Member {
  _id: string;
  name: string;
  role: string;
  image: string;
}

const API_URL = `${import.meta.env.VITE_API_URL}/team`;

// Roles existants (doivent matcher exactement l'enum du backend)
const ROLE_OPTIONS = [
  "President",
  "Executive Vice President",
  "Vice President",
  "Secretary",
  "Treasurer",
  
] as const;

export default function Member() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("User"); // default
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setMembers(Array.isArray(response.data?.teams) ? response.data.teams : []);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (member?: Member) => {
    if (member) {
      setCurrentMember(member);
      setName(member.name);
      setRole(member.role || "User");
      setImagePreview(member.image);
    } else {
      setCurrentMember(null);
      setName("");
      setRole("User"); // reset default
      setImagePreview(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentMember(null);
    setName("");
    setRole("User");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);

      if (imageFile) {
        // Attention: ton backend controller utilise req.files => souvent upload.array("images")
        formData.append("images", imageFile);
      } else if (!currentMember) {
        alert("Please select an image");
        setIsSubmitting(false);
        return;
      }

      if (currentMember) {
        await axios.put(`${API_URL}/${currentMember._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchMembers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Failed to save member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setMembers(members.filter((m) => m._id !== id));
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete member");
      }
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">Manage your team members here.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team List</CardTitle>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search members..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
              <Users className="mb-2 h-8 w-8 opacity-20" />
              <p>No members found</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMembers.map((member) => (
                <div
                  key={member._id}
                  className="group relative flex flex-col items-center rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-50 group-hover:ring-blue-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name);
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-slate-500">{member.role}</p>

                  <div className="mt-4 flex w-full gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => handleOpenModal(member)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleDelete(member._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold">{currentMember ? "Edit Member" : "Add New Member"}</h3>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Full Name</label>
                <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
              </div>

              {/* ROLE SELECT */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Role / Position</label>
                <select
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Photo</label>
                <div
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition-colors hover:border-blue-400 hover:bg-blue-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-white"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <ImageIcon className="mb-2 h-8 w-8" />
                      <span className="text-xs">Click to upload image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="w-full" onClick={handleCloseModal} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {currentMember ? "Save Changes" : "Create Member"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}