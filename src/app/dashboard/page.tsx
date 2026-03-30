import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { LogOut, Home, Building, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { signOut } from "../../../auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {session.user?.name?.split(" ")[0]}
            </h1>
            <p className="mt-2 text-foreground/60">
              Overview of your exclusive property portfolio.
            </p>
          </div>
          
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="flex items-center px-5 py-2.5 rounded-full border border-border-color text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { name: "Overview", icon: Home, active: true },
              { name: "My Properties", icon: Building, active: false },
              { name: "Documents", icon: FileText, active: false },
              { name: "Account Settings", icon: Settings, active: false },
            ].map((item) => (
              <Link
                key={item.name}
                href="#"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  item.active
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:bg-foreground/5"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Total Asset Value", value: "R 45.2M" },
                { label: "Annualized Yield", value: "8.4%" },
                { label: "Active Properties", value: "3" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-6 rounded-2xl">
                  <p className="text-sm font-medium text-foreground/60 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-8 rounded-3xl">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[
                  { date: "Oct 12, 2026", title: "Quarterly Yield Distribution Processed", amount: "+ R 184,000" },
                  { date: "Sep 28, 2026", title: "New Documentation Uploaded: The Metropolitan", amount: "" },
                  { date: "Aug 15, 2026", title: "Capital Appreciation Analysis Completed", amount: "" },
                ].map((activity, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-border-color last:border-0 last:pb-0">
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">{activity.date}</p>
                      <p className="text-sm font-medium">{activity.title}</p>
                    </div>
                    {activity.amount && (
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {activity.amount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
