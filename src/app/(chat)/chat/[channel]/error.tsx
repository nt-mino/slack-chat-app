"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <h1 className="text-[21px] font-bold">チャンネルが存在しません...</h1>
    </div>
  );
}
