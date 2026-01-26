import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import categoryReducer from "./slices/category/categorySlice";
import subCategoryReducer from "./slices/subcategory/subcategorySlice";
import childCategoryReducer from "./slices/childcategory/childcategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    childCategory: childCategoryReducer,
  },
});
