import { Label, Text } from 'suomifi-ui-components';
import type { Certification, EscoSkill } from '@/types';
import { useModal } from '@/context/modal-context';
import CertificationsEdit from './certifications-edit';

interface Props {
  userCertifications: Certification[] | undefined;
  escoSkills: EscoSkill[];
  onSelect: (selected: Certification[]) => void;
}

export default function CertificationsSelect(props: Props) {
  const { userCertifications, escoSkills, onSelect } = props;

  const { openModal, closeModal } = useModal();

  const openEdit = () =>
    openModal({
      title: 'Add your certifications',
      content: (
        <CertificationsEdit
          userCertifications={userCertifications || []}
          escoSkills={escoSkills}
          onSave={selected => {
            onSelect(selected);
            closeModal();
          }}
          onClose={closeModal}
        />
      ),
      onClose: () => {},
    });

  return (
    <div>
      <Label>Certifications</Label>
      {!userCertifications?.length ? (
        <Text className="!text-base">
          <span>No certifications selected, </span>
          <span
            role="button"
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            onClick={openEdit}
          >
            click here to add.
          </span>
        </Text>
      ) : (
        <ul className="list-disc list-outside text-base ml-[17px]">
          {userCertifications.map((c, index) => (
            <li key={`${c.escoIdentifier}-${index}`}>
              <Text className="!text-base">
                <span
                  role="button"
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  onClick={openEdit}
                >
                  {c.certificationName}
                </span>
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
