/**
 * PostForm Storybook
 *
 * @概要
 *   - PostFormコンポーネントのバリエーションをStorybookで表示
 */
import React from "react";
import PostForm from "./PostForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "features/feed/PostForm",
  component: PostForm,
};

export const Default = () => <PostForm onSubmit={action("onSubmit")} />;

export const Loading = () => (
  <PostForm onSubmit={action("onSubmit")} loading={true} />
);
