export default function ShareButton({ data }: any) {
  const shareContent = `
🎯 My Daily CastPulse Summary:
Casts: ${data.totalCasts}
Likes: ${data.totalLikes}
Recasts: ${data.totalRecasts}
Replies: ${data.totalReplies}
Score: ${data.score}
🔥 Streak: ${data.streak} days
💬 "${data.motivation}"
Check your score: YOUR_APP_LINK
`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ text: shareContent });
    } else {
      navigator.clipboard.writeText(shareContent);
      alert("✅ Copied to clipboard! Share your score with friends.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow hover:from-blue-600 hover:to-purple-600 transition-all"
    >
      📤 Share My Score
    </button>
  );
}
