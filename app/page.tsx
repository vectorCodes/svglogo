import DesktopOnlyNotice from "#/components/DesktopOnlyNotice";
import EditorPage from "#/components/EditorPage";
import FABs from "#/components/FABs";
import UpdatesFab from "#/components/UpdatesFab";
import { fetchLatestNotification } from "#/lib/notifications";

export default async function Home() {
  const notification = await fetchLatestNotification();

  return (
    <>
      <DesktopOnlyNotice />
      <div className="hidden md:block">
        <FABs />
        <EditorPage />
        <UpdatesFab notification={notification} />
      </div>
    </>
  );
}
