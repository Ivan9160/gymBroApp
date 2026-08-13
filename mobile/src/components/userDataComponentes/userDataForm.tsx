import { CreateProfileForm } from "./createProfileForm";
import { EditProfileForm } from "./editProfileForm";

interface Props {
    status: "new" | "existing" | string;
}

/**
 * Thin compatibility wrapper so existing call sites that pass
 * `status="new" | "existing"` keep working without changes.
 * New code should import CreateProfileForm / EditProfileForm directly.
 */
export function UserDataForm({ status }: Props) {
    return status === "existing" ? <EditProfileForm /> : <CreateProfileForm />;
}

export default UserDataForm;