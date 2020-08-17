import React from "react";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/index.html");
  }, []);
  return <div></div>;
}

export default Index;