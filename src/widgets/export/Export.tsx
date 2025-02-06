import { useState } from 'react';
import './Export.scss';

const ExportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="exportBox" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <div className="title">Экспортировать</div>
          <button className="closeButton" onClick={onClose}>✕</button>
        </div>
        <div className="modalContent">
          <div className="modalOption" onClick={() => console.log('HTML')}>Экспортировать в HTML</div>
          <div className="modalOption" onClick={() => console.log('PDF')}>Экспортировать в PDF</div>
        </div>
      </div>
    </div>
  );
};

const ExportButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container">
      <button className="exportButton" onClick={() => setModalOpen(true)}>Экспортировать</button>
      <ExportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ExportButton;
