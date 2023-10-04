import { useNavigate } from "react-router-dom";
import { ButtonLink } from '../shared/ButtonLink';

export default function Error404() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
  } 
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
          <ButtonLink to="/">Go back home</ButtonLink>
          <ButtonLink to="#">Contact support <span aria-hidden="true">&rarr;</span></ButtonLink>
          </div>
        </div>
      </main>
    </>
  );
}
