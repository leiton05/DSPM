import { IonButton } from "@ionic/react";

interface NavbarProp {
  title: string;
  imgUrl: string;
  alt: string;
}

function Navbar({ title, imgUrl, alt }: NavbarProp) {
  return (
    <div className="relative flex items-center justify-center px-4 py-4 sm:px-6">
      <IonButton
        routerLink="/"
        className="absolute left-4 sm:left-6"
        fill="clear"
      >
        Inicio
      </IonButton>

      <div className="flex items-center">
        <img
          src={imgUrl}
          alt={alt}
          className="mr-2 w-12 sm:w-16 md:w-20 mr-4"
        />

        <h1 className="text-4xl font-bold sm:text-3xl md:text-5xl ml-4">
          {title}
        </h1>
      </div>

    </div>
  );
}

export default Navbar;
