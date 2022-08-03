import { GetServerSideProps, Redirect } from "next";

function getServerRedirectUrl<T extends GetServerSideProps>(
  req: Parameters<T>[0]
): Redirect {
  const fullPathUrl = `${process.env.NEXTAUTH_URL}${req.resolvedUrl}`;

  return {
    destination: `/auth/signin?callbackUrl=${encodeURIComponent(fullPathUrl)}`,
    permanent: false,
  };
}

export default getServerRedirectUrl;
