import * as React from "react"
import Seo from "./seo"

export const Head = ({
  location,
  params,
  data,
  pageContext,
  title,
  description,
  children,
}) => {
  return (
    <Seo
      title={title || pageContext.title}
      description={description}
      data={data}
    >
      {children}
    </Seo>
  )
}
