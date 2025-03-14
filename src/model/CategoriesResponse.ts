export default interface CategoriesResponse {
  id: string;
  name: string;
  categoryUrlImage?: string;
  parent_Id?: string;
  children: CategoriesResponse[];
  isShow: boolean;
}
