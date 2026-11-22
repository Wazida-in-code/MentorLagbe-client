
"use client";

import React, { useState, FormEvent } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  UserRound,
  Mail,
  Phone,
  Camera,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Save,
  Loader2,
  Pencil,
  ImagePlus,
} from "lucide-react";
import { updateProfile } from "@/lib/userProfileApi";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [image, setImage] = useState(user?.image || "");
  const [profileUserId, setProfileUserId] = useState(user?.id);
  const [loading, setLoading] = useState(false);

  // Reset the form when the signed-in user changes.
  if (user && profileUserId !== user.id) {
    setProfileUserId(user.id);
    setName(user.name || "");
    setPhone(user.phone || "");
    setBio(user.bio || "");
    setImage(user.image || "");
  }

  // Update profile
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!user?.id) {
    toast.error("Please sign in first!");
    return;
  }

  const updatedData = {
    name,
    phone,
    bio,
    image,
  };

  try {
    setLoading(true);

    const result = await updateProfile(user.id, updatedData);

    if (result.modifiedCount > 0) {
      toast.success("Profile updated successfully!");
      window.location.reload();
    } else {
      toast.info("No changes were made!");
    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to update profile!");
  } finally {
    setLoading(false);
  }
};

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <UserRound size={40} />
        <h2 className="text-xl font-bold">Please sign in</h2>
        <p className="text-sm text-gray-500">
          Sign in to manage your profile.
        </p>
      </div>
    );
  }

  const role = user.role || "student";

  return (
    <div className="min-h-screen bg-[#F8F7F4] px-4 py-10 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary mb-2">
            ACCOUNT SETTINGS
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#202B36]">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information and profile settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">

            <div className="flex flex-col items-center text-center">

              {/* Profile Image */}
              <div className="relative mb-4">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#F1EBE5]"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-[#F1EBE5] flex items-center justify-center text-4xl font-bold text-[#8A5A3C]">
                    {name.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-4 border-white">
                  <Camera size={16} />
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#202B36]">
                {name || "Your Name"}
              </h2>

              <p className="text-sm text-gray-500 mt-1 break-all">
                {user.email}
              </p>

              {/* Role Badge */}
              <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFE9] text-[#8A5A3C] text-sm font-semibold capitalize">
                {role === "admin" ? (
                  <ShieldCheck size={16} />
                ) : role === "tutor" ? (
                  <BookOpen size={16} />
                ) : (
                  <GraduationCap size={16} />
                )}
                {role}
              </div>

              <div className="w-full border-t border-gray-100 my-6" />

              <div className="w-full text-left space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={17} className="text-primary" />
                  <span className="break-all">{user.email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={17} className="text-primary" />
                  {phone || "No phone number added"}
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-7">
                Your profile helps other members know you better.
              </p>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">

            <div className="flex items-center gap-3 mb-7">
              <div className="p-3 rounded-xl bg-[#F5EFE9] text-primary">
                <Pencil size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#202B36]">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500">
                  Update your profile details below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                />
              </div>

              {/* Email - Read Only */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Email address cannot be changed here.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  About Me
                </label>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us something about yourself..."
                  rows={4}
                  maxLength={300}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition resize-none"
                />

                <p className="text-xs text-gray-400 text-right mt-1">
                  {bio.length}/300 characters
                </p>
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Profile Picture URL
                </label>

                <div className="relative">
                  <ImagePlus
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Paste an image URL to update your profile picture.
                </p>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white px-7 py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
