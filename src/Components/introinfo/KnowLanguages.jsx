export default function KnowLanguages() {
  const handleChange = (e) => {
    let lang = e.target.value;
    setLang(lang);

    if (languageToProjects[lang]) {
      setProjectType(languageToProjects[lang]);
    } else {
      setProjectType([]);
    }
  };
  return <>known languages</>;
}
