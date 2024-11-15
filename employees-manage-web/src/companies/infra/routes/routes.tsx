import { Route } from "react-router-dom"
import ListCompanies from "../ui/index/ListCompanies"

export const CompaniesRoutes = ()=>{
    return <Route path="/entreprise">
                      <Route index element={<ListCompanies />} />
                      {/* <Route path="create" element={<BlogPostCreate />} /> */}
                      {/* <Route path="edit/:id" element={<BlogPostEdit />} /> */}
                      {/* <Route path="show/:id" element={<BlogPostShow />} /> */}
                    </Route>
}