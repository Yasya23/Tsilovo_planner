import DefaultLayout from '@/shared/components/layouts/Default';

import { ConfirmDelete } from '@/features/confirm-delete-account/page/ConfirmDelete';

const page = () => {
  return (
    <DefaultLayout>
      <ConfirmDelete />
    </DefaultLayout>
  );
};

export default page;
