import { useState, useEffect, useRef } from "react";
import {
    Calendar,
    MapPin,
    Clock,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Image as ImageIcon,
    Loader2,
    X,
    FileText,
    AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import axios from "axios";

// Define Event Interface based on Mongoose Schema
interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    details: string;
    status: 'upcoming' | 'past';
    createdAt?: string;
    updatedAt?: string;
}

type FilterStatus = "all" | "upcoming" | "past";

const API_URL = `${import.meta.env.VITE_API_URL}/event`;

export default function EventsPage() {
    // State
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        details: "",
        status: "upcoming" as "upcoming" | "past"
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch Events
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            // Assuming the response returns an array directly or an object with a data property
            // Based on typical express controllers. Let's assume response.data is the array or { events: [...] }
            // We'll standardise to ensure we get an array
            const data = response.data;
            if (Array.isArray(data)) {
                setEvents(data);
            } else if (data.events && Array.isArray(data.events)) {
                setEvents(data.events);
            } else {
                setEvents([]);
                console.warn("Unexpected API response structure", data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handlers
    const handleOpenModal = (event?: Event) => {
        if (event) {
            setCurrentEvent(event);
            setFormData({
                title: event.title,
                description: event.description,
                date: event.date ? new Date(event.date).toISOString().split('T')[0] : "",
                time: event.time,
                location: event.location,
                details: event.details,
                status: event.status
            });
            setImagePreview(event.image);
        } else {
            setCurrentEvent(null);
            setFormData({
                title: "",
                description: "",
                date: "",
                time: "",
                location: "",
                details: "",
                status: "upcoming"
            });
            setImagePreview(null);
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentEvent(null);
        setImageFile(null);
        setImagePreview(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                // Optimistic update
                setEvents(events.filter(e => e._id !== id));
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("Erreur lors de la suppression de l'événement");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            if (imageFile) {
                data.append("images", imageFile);
            } else if (!currentEvent) {
                alert("Veuillez sélectionner une image pour l'événement");
                setIsSubmitting(false);
                return;
            }

            if (currentEvent) {
                await axios.put(`${API_URL}/${currentEvent._id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post(API_URL, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            await fetchEvents();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Erreur lors de l'enregistrement de l'événement");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || event.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 pt-1 md:pt-4">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Événements</h2>
                    <p className="text-slate-500">Gérez les événements et activités de l'organisation.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                    <Plus className="mr-2 h-4 w-4" /> Nouvel Événement
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Rechercher un événement..."
                        className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtrer par statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="upcoming">À venir</SelectItem>
                            <SelectItem value="past">Passé</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Events Grid */}
            {isLoading ? (
                <div className="flex h-60 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                    <div className="rounded-full bg-slate-100 p-3 mb-3">
                        <Calendar className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium text-slate-900">Aucun événement trouvé</p>
                    <p className="text-sm text-slate-500">Commencez par créer un nouvel événement.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <Card key={event._id} className="overflow-hidden group hover:shadow-md transition-all border-slate-200">
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                <img
                                    src={event.image || "/placeholder-event.jpg"} // Fallback image if needed
                                    alt={event.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&background=random`;
                                    }}
                                />
                                <div className="absolute top-3 right-3">
                                    <Badge className={`${event.status === 'upcoming' ? 'bg-emerald-500/90 hover:bg-emerald-600' : 'bg-slate-500/90 hover:bg-slate-600'} backdrop-blur-sm shadow-sm border-0`}>
                                        {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                                    </Badge>
                                </div>
                            </div>

                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">{event.title}</h3>
                                        <div className="flex items-center text-sm text-slate-500 mt-1">
                                            <Calendar className="mr-1.5 h-3.5 w-3.5" />
                                            {format(new Date(event.date), "d MMMM yyyy", { locale: fr })}
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 text-slate-500">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleOpenModal(event)}>
                                                <Edit className="mr-2 h-4 w-4" /> Modifier
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDelete(event._id)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <p className="text-sm text-slate-600 line-clamp-2 min-h-[2.5rem] mb-4">
                                    {event.description}
                                </p>

                                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Clock className="mr-2 h-3.5 w-3.5 text-blue-500" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <MapPin className="mr-2 h-3.5 w-3.5 text-blue-500" />
                                        {event.location}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{currentEvent ? "Modifier l'événement" : "Créer un événement"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium">Titre de l'événement</label>
                                <Input
                                    required
                                    placeholder="Ex: Conférence Annuelle"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium">Description courte</label>
                                <Textarea
                                    required
                                    placeholder="Une brève description de l'événement..."
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Date</label>
                                <Input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Heure</label>
                                <Input
                                    type="time"
                                    required
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium">Lieu</label>
                                <div className="relative">
                                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        className="pl-9"
                                        placeholder="Ex: Hôtel Royal, Tunis"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium">Détails Complets</label>
                                <Textarea
                                    required
                                    placeholder="Tous les détails de l'événement..."
                                    rows={4}
                                    value={formData.details}
                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Statut</label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(v: "upcoming" | "past") => setFormData({ ...formData, status: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="upcoming">À venir</SelectItem>
                                        <SelectItem value="past">Passé</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium">Image de couverture</label>
                                <div
                                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition-colors hover:border-blue-400 hover:bg-blue-50"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <div className="relative h-48 w-full">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-full w-full rounded-md object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                                <p className="text-white font-medium">Changer l'image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-slate-400">
                                            <ImageIcon className="mb-2 h-8 w-8" />
                                            <span className="text-xs">Cliquez pour ajouter une image</span>
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
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={handleCloseModal} disabled={isSubmitting}>
                                Annuler
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {currentEvent ? "Enregistrer" : "Créer"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
