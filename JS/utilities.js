const scrollToSection = (getId) => {
    const getElement = document.getElementById(getId);
    if (getElement) {
      getElement.scrollIntoView({ behavior: "smooth" });
    }
  };