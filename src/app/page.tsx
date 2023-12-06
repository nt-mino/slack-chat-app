import Link from "next/link";

export default function Page({}) {
  return (
    <div>
      <h1>トップページ</h1>
      <Link href={"/chat"}>チャットページ</Link>
    </div>
  );
}
