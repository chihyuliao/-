import dynamic from "next/dynamic";

// 完全 client-side，不做 SSR
const ListeningPage = dynamic(() => import("../../components/ListeningPage"), { ssr: false });

export default ListeningPage;
