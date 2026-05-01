import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProfile, updateProfile } from "../Services/UserService";

const Settings = () => {
  const [user, setUser] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res) setUser(res);
    } catch {
      toast.error("Failed to load profile");
    }
  };
  fetchProfile();
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await updateProfile(user);

      if (res?.data) toast.success("Profile updated 🚀");
      else toast.error(res?.message || "Update failed");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center px-4 py-12">

      <div className="w-full max-w-xl space-y-8">

        {/* 🔥 HEADER */}
        <div className="text-center space-y-3">

          {/* Avatar */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl font-bold shadow-lg">
            {user.Firstname?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {user.Firstname} {user.Lastname}
            </h2>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>

        </div>

        {/* 🔥 FORM CARD */}
        <div className="bg-card border rounded-2xl p-6 space-y-6 shadow-sm">

          {/* First Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              First Name
            </label>
            <input
              id="Firstname"
              value={user.Firstname}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Last Name
            </label>
            <input
              id="Lastname"
              value={user.Lastname}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <input
              value={user.email}
              disabled
              className="w-full h-11 px-4 rounded-lg border bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Phone
            </label>
            <input
              id="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

        </div>

        {/* 🔥 ACTION */}
        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>

      </div>
    </div>
  );
};

export default Settings;