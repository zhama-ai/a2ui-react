/**
 * ImageGallery - 图片画廊
 *
 * 图片/图表展示
 */

import { createContainer, createText, createButton } from '../components';
import type { PatternResult, PatternOptions, ActionButton } from '../types';

export interface GalleryImage {
  /** 唯一 ID */
  id: string;
  /** 图片 URL 或占位图标 */
  src: string;
  /** 替代文本 */
  alt: string;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
}

export interface ImageGalleryOptions extends PatternOptions {
  /** 标题 */
  title?: string;
  /** 图片列表 */
  images: GalleryImage[];
  /** 列数 */
  columns?: 2 | 3 | 4;
  /** 变体 */
  variant?: 'default' | 'masonry' | 'carousel';
  /** 点击动作 */
  clickAction?: ActionButton;
  /** 是否显示标题 */
  showCaptions?: boolean;
}

/**
 * 创建图片画廊
 *
 * @example
 * ```typescript
 * const { rootId, components } = createImageGallery({
 *   title: '课程截图',
 *   images: [
 *     { id: '1', src: '📊', alt: '图表1', title: 'Python 语法' },
 *     { id: '2', src: '📈', alt: '图表2', title: '进度展示' },
 *   ],
 *   columns: 3,
 *   showCaptions: true,
 * });
 * ```
 */
export function createImageGallery(options: ImageGalleryOptions): PatternResult {
  const {
    id = 'image-gallery',
    title,
    images,
    columns = 3,
    variant = 'default',
    clickAction,
    showCaptions = true,
  } = options;

  const components: unknown[] = [];
  const containerChildIds: string[] = [];

  const isCarousel = variant === 'carousel';

  // 标题
  if (title) {
    const titleId = `${id}-title`;
    containerChildIds.push(titleId);
    components.push(
      createText(titleId, title, {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px',
      })
    );
  }

  // 图片网格/轮播
  const galleryId = `${id}-gallery`;
  const imageIds: string[] = [];

  images.forEach((image, index) => {
    const imageId = `${id}-image-${index}`;
    const imageChildIds: string[] = [];

    // 图片容器（使用 emoji 作为占位）
    const imgContainerId = `${imageId}-container`;
    const imgChildIds: string[] = [];

    // 图片/占位图标
    const imgId = `${imageId}-img`;
    imgChildIds.push(imgId);

    // 如果是 emoji，直接显示；否则作为 URL 处理
    const isEmoji = image.src.length <= 4 && /[\p{Emoji}]/u.test(image.src);
    if (isEmoji) {
      components.push(
        createText(imgId, image.src, {
          fontSize: '48px',
        })
      );
    } else {
      // 对于实际图片 URL，显示占位符
      components.push(
        createText(imgId, '🖼️', {
          fontSize: '48px',
          opacity: '0.5',
        })
      );
    }
    components.push(
      createContainer(imgContainerId, imgChildIds, {
        width: '100%',
        aspectRatio: '16/9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        overflow: 'hidden',
      })
    );
    imageChildIds.push(imgContainerId);

    // 标题和描述
    if (showCaptions && (image.title || image.description)) {
      const captionId = `${imageId}-caption`;
      const captionChildIds: string[] = [];

      if (image.title) {
        const imageTitleId = `${imageId}-title`;
        captionChildIds.push(imageTitleId);
        components.push(
          createText(imageTitleId, image.title, {
            fontSize: '14px',
            fontWeight: '500',
            color: '#1f2937',
          })
        );
      }

      if (image.description) {
        const descId = `${imageId}-desc`;
        captionChildIds.push(descId);
        components.push(
          createText(descId, image.description, {
            fontSize: '12px',
            color: '#6b7280',
            marginTop: '2px',
          })
        );
      }
      components.push(
        createContainer(captionId, captionChildIds, {
          display: 'flex',
          flexDirection: 'column',
          marginTop: '8px',
        })
      );
      imageChildIds.push(captionId);
    }

    // 图片项容器
    let actualImageId = imageId;
    if (clickAction) {
      const context = [
        { key: 'imageId', value: image.id },
        { key: 'imageIndex', value: `${index}` },
        ...(clickAction.context
          ? Object.entries(clickAction.context).map(([key, value]) => ({ key, value }))
          : []),
      ];
      // 使用图片标题作为按钮文本
      const buttonText = image.title || image.alt || `查看图片 ${index + 1}`;
      const imgBtnResult = createButton(imageId, buttonText, clickAction.action, context, {
        styles: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
          textAlign: 'left',
        },
      });
      components.push(...imgBtnResult.allComponents);
      actualImageId = imgBtnResult.buttonId;
    } else {
      components.push(
        createContainer(imageId, imageChildIds, {
          display: 'flex',
          flexDirection: 'column',
        })
      );
    }

    imageIds.push(actualImageId);
  });
  const galleryStyle: Record<string, string> = isCarousel
    ? {
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '8px',
      }
    : {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
      };

  if (isCarousel) {
    // 轮播项固定宽度
    imageIds.forEach((_, index) => {
      const imageComp = components.find(
        (c) => (c as Record<string, unknown>).id === `${id}-image-${index}`
      ) as Record<string, unknown> | undefined;
      if (imageComp) {
        const component = imageComp.component as
          | Record<string, Record<string, unknown>>
          | undefined;
        const containerDef = component?.Container;
        if (
          containerDef &&
          typeof containerDef.styles === 'object' &&
          containerDef.styles !== null
        ) {
          const style = containerDef.styles as Record<string, string>;
          style.minWidth = '280px';
          style.maxWidth = '320px';
        }
      }
    });
  }

  components.push(createContainer(galleryId, imageIds, galleryStyle));
  containerChildIds.push(galleryId);

  // 主容器
  components.push(
    createContainer(id, containerChildIds, {
      display: 'flex',
      flexDirection: 'column',
    })
  );

  return { rootId: id, components };
}
