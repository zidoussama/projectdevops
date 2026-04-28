import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Image as ImageIcon,
  FileText,
  TrendingUp,
  Activity,
  BarChart3,
  UserPlus,
  Mail,
  Heart,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => (
  <Card className="border-slate-200/60 shadow-sm transition-shadow hover:shadow-md">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
          <div className="text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
        </div>

        <div className="shrink-0 rounded-xl bg-slate-100 p-2 text-slate-700">{icon}</div>
      </div>

      <CardDescription className="text-xs">{description}</CardDescription>

      {trend && (
        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          <TrendingUp className="h-3.5 w-3.5" />
          {trend}
        </div>
      )}
    </CardHeader>
  </Card>
);

export default function Home() {
  const navigate = useNavigate();
  const [adminName] = useState("Admin JCI");

  const stats = [
    {
      title: "Membres Total",
      value: "142",
      description: "+12 ce mois",
      icon: <Users className="h-5 w-5" />,
      trend: "+8.2%",
    },
    {
      title: "Événements",
      value: "24",
      description: "8 à venir",
      icon: <Calendar className="h-5 w-5" />,
      trend: "+12.5%",
    },
    {
      title: "Projets",
      value: "18",
      description: "5 en cours",
      icon: <Activity className="h-5 w-5" />,
      trend: "+4.1%",
    },
    {
      title: "Nouveaux Inscrits",
      value: "32",
      description: "Ce mois",
      icon: <UserPlus className="h-5 w-5" />,
      trend: "+18.2%",
    },
  ];

  const recentActivities = [
    { id: 1, type: "member", message: "Nouveau membre inscrit", user: "Mohamed Ben Ali", time: "Il y a 2 heures" },
    { id: 2, type: "event", message: "Événement créé", user: "Formation Leadership", time: "Il y a 4 heures" },
    { id: 3, type: "project", message: "Projet mis à jour", user: "Nettoyage de plage", time: "Il y a 6 heures" },
    { id: 4, type: "member", message: "Membre approuvé", user: "Fatma Gharbi", time: "Il y a 1 jour" },
  ];

  const quickActions = [
    { icon: <UserPlus className="h-5 w-5" />, label: "Ajouter Membre", path: "/admin/members" },
    { icon: <Calendar className="h-5 w-5" />, label: "Créer Événement", path: "/admin/events" },
    { icon: <ImageIcon className="h-5 w-5" />, label: "Gérer Galerie", path: "/admin/gallery" },
    { icon: <FileText className="h-5 w-5" />, label: "Nouveau Article", path: "/admin/news" },
  ];

  const activityIcon = (type: string) => {
    if (type === "member") return <Users className="h-4 w-4 text-blue-700" />;
    if (type === "event") return <Calendar className="h-4 w-4 text-blue-700" />;
    return <Activity className="h-4 w-4 text-blue-700" />;
  };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6 md:py-8">
      {/* Top section */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">Tableau de bord</h2>
          <p className="text-sm text-slate-600">
            Bienvenue, <span className="font-medium text-slate-900">{adminName}</span> — aperçu de la plateforme.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistiques
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4" />
            Rapport
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-slate-200/60">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                type="button"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-100">
                    {action.icon}
                  </div>
                  <span className="text-xs text-slate-400 transition-colors group-hover:text-blue-600">Ouvrir</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-500">Accès direct</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="border-slate-200/60 lg:col-span-4">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Les dernières actions sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <li key={activity.id} className="relative">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                    <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-blue-50">
                      {activityIcon(activity.type)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-slate-900">{activity.message}</p>
                        <span className="whitespace-nowrap text-xs text-slate-500">{activity.time}</span>
                      </div>
                      <p className="truncate text-sm text-slate-600">{activity.user}</p>
                    </div>
                  </div>

                  {idx !== recentActivities.length - 1 && (
                    <span className="absolute left-[22px] top-[52px] h-4 w-px bg-slate-200" />
                  )}
                </li>
              ))}
            </ol>

            <Button variant="ghost" className="mt-4 w-full">
              Voir tout
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <Card className="border-slate-200/60 lg:col-span-3">
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
            <CardDescription>Résumé de cette semaine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Nouveaux likes", value: "248", icon: <Heart className="h-4 w-4" />, bg: "bg-emerald-50", fg: "text-emerald-700" },
              { label: "Messages", value: "47", icon: <Mail className="h-4 w-4" />, bg: "bg-blue-50", fg: "text-blue-700" },
              { label: "Photos ajoutées", value: "156", icon: <ImageIcon className="h-4 w-4" />, bg: "bg-purple-50", fg: "text-purple-700" },
              { label: "Taux d'engagement", value: "92%", icon: <TrendingUp className="h-4 w-4" />, bg: "bg-orange-50", fg: "text-orange-700" },
            ].map((item) => (
              <div key={item.label} className={`flex items-center justify-between rounded-xl border border-slate-100 p-4 ${item.bg}`}>
                <div className="flex items-center gap-3">
                  <div className={`grid h-9 w-9 place-items-center rounded-full bg-white/70 ${item.fg}`}>{item.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <p className="text-2xl font-semibold tracking-tight text-slate-900">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}