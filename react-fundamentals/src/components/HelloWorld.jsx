import { useTranslation } from "react-i18next";

export default function HelloWorld({name}) {
  const { t } = useTranslation()

  return (
    <>
      <h1 className="text-3xl font-bold underline">{t('welcomeMessage', {name: name})}</h1>
    </>
  )
}
