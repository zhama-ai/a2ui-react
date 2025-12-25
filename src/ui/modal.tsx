/**
 * A2UI Modal Component
 */

import { useCallback, useEffect, useState, type ReactNode } from 'react';

import { useTheme } from '../context/theme';
import type { AnyComponentNode, MessageProcessor, SurfaceID } from '../types/types';

import { cn } from './utils';

export interface ModalProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  entryPoint?: ReactNode;
  content?: ReactNode;
}

export function Modal({ entryPoint, content }: ModalProps) {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // 键盘事件处理：ESC 关闭
  useEffect(() => {
    if (!showModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal, closeModal]);

  if (!showModal) {
    return (
      <button type="button" onClick={() => setShowModal(true)} className="cursor-pointer">
        {entryPoint}
      </button>
    );
  }

  return (
    <dialog
      className={cn(theme.components.Modal.backdrop)}
      open
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <section className={cn(theme.components.Modal.element)}>
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            className="rounded p-1 hover:bg-gray-100"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {content}
      </section>
    </dialog>
  );
}
