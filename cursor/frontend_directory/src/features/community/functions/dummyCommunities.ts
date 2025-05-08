/**
 * コミュニティダミーデータ
 *
 * @概要
 *   - 5件のダミーコミュニティデータ。
 *   - 各コミュニティはCommunity型に準拠。
 */
import type { Community } from "../../../types";

export const dummyCommunities: Community[] = [
  {
    id: "community-1",
    name: "釣り愛好会",
    description: "釣り好きが集まるコミュニティです。",
    iconUrl: null,
    color: "#5c6bc0",
  },
  {
    id: "community-2",
    name: "読書部",
    description: "本好きのための読書コミュニティ。",
    iconUrl: null,
    color: "#9575cd",
  },
  {
    id: "community-3",
    name: "プログラミング同好会",
    description: "プログラミングに関する情報交換。",
    iconUrl: null,
    color: "#4db6ac",
  },
  {
    id: "community-4",
    name: "映画サークル",
    description: "映画好きが集まる場所。",
    iconUrl: null,
    color: "#263238",
  },
  {
    id: "community-5",
    name: "カフェ巡り会",
    description: "カフェ好きの交流コミュニティ。",
    iconUrl: null,
    color: "#eceff1",
  },
];
