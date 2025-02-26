import { useTranslation } from "@novelist/locales"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@novelist/ui"
import { Link } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { useLayout } from "../context/layout-context"

export default function PageBreadcrumb() {
  const { breadcrumbList } = useLayout()
  const { t } = useTranslation()

  return (
    <Breadcrumb className="px-6 py-3">
      <BreadcrumbList>
        {breadcrumbList.map((item, inx) => {
          const isLast = inx === breadcrumbList.length - 1
          return (
            <Fragment key={item.url}>
              {inx !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast || item.current ? (
                  <BreadcrumbPage>{t(item.label)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.url}>{t(item.label)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
