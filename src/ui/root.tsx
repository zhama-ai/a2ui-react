/**
 * A2UI Root Component
 * 组件树渲染根节点
 */

import type { ReactNode } from 'react';

import type { A2UIAction } from '../events/a2ui';
import type {
  AnyComponentNode,
  MessageProcessor,
  SurfaceID,
  TextNode,
  ImageNode,
  IconNode,
  VideoNode,
  AudioPlayerNode,
  RowNode,
  ColumnNode,
  ListNode,
  CardNode,
  TabsNode,
  DividerNode,
  ModalNode,
  ButtonNode,
  CheckboxNode,
  TextFieldNode,
  DateTimeInputNode,
  MultipleChoiceNode,
  SliderNode,
  ChartNode,
} from '../types/types';

import { Audio } from './audio';
import { Button } from './button';
import { Card } from './card';
import { Chart } from './chart';
import { Checkbox } from './checkbox';
import { Column } from './column';
import { componentRegistry } from './component-registry';
import { DateTimeInput } from './datetime-input';
import { Divider } from './divider';
import { Icon } from './icon';
import { Image } from './image';
import { List } from './list';
import { Modal } from './modal';
import { MultipleChoice } from './multiple-choice';
import { Row } from './row';
import { Slider } from './slider';
import { Tabs } from './tabs';
import { Text } from './text';
import { TextField } from './text-field';
import { Video } from './video';

export interface RootProps {
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  childComponents: AnyComponentNode[] | null;
  enableCustomElements?: boolean;
  onAction?: (event: A2UIAction) => void;
}

export function Root({
  processor,
  surfaceId,
  childComponents,
  enableCustomElements = false,
  onAction,
}: RootProps) {
  if (!childComponents || !Array.isArray(childComponents)) {
    return null;
  }

  return (
    <>
      {childComponents.map((component) => (
        <ComponentRenderer
          key={component.id}
          component={component}
          processor={processor}
          surfaceId={surfaceId}
          enableCustomElements={enableCustomElements}
          onAction={onAction}
        />
      ))}
    </>
  );
}

interface ComponentRendererProps {
  component: AnyComponentNode;
  processor: MessageProcessor | null;
  surfaceId: SurfaceID | null;
  enableCustomElements: boolean;
  onAction?: (event: A2UIAction) => void;
}

function ComponentRenderer({
  component,
  processor,
  surfaceId,
  enableCustomElements,
  onAction,
}: ComponentRendererProps): ReactNode {
  // 1. 检查是否有自定义注册的组件
  if (enableCustomElements) {
    const CustomComponent = componentRegistry.get(component.type);
    if (CustomComponent) {
      return (
        <CustomComponent
          key={component.id}
          component={component}
          processor={processor}
          surfaceId={surfaceId}
          {...component.properties}
        />
      );
    }
  }

  // 2. 使用内置组件
  switch (component.type) {
    case 'Text': {
      const node = component as TextNode;
      return (
        <Text
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          text={node.properties.text}
          usageHint={node.properties.usageHint}
        />
      );
    }

    case 'Image': {
      const node = component as ImageNode;
      return (
        <Image
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          url={node.properties.url}
          usageHint={node.properties.usageHint}
          fit={node.properties.fit}
        />
      );
    }

    case 'Icon': {
      const node = component as IconNode;
      return (
        <Icon
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          name={node.properties.name}
          container={node.properties.container}
          variant={node.properties.variant}
          size={node.properties.size}
        />
      );
    }

    case 'Video': {
      const node = component as VideoNode;
      return (
        <Video
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          url={node.properties.url}
        />
      );
    }

    case 'AudioPlayer': {
      const node = component as AudioPlayerNode;
      return (
        <Audio
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          url={node.properties.url}
          description={node.properties.description}
        />
      );
    }

    case 'Button': {
      const node = component as ButtonNode;
      return (
        <Button
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          action={node.properties.action}
          onAction={onAction}
        >
          {node.properties.child && (
            <ComponentRenderer
              component={node.properties.child}
              processor={processor}
              surfaceId={surfaceId}
              enableCustomElements={enableCustomElements}
              onAction={onAction}
            />
          )}
        </Button>
      );
    }

    case 'Row': {
      const node = component as RowNode;
      return (
        <Row
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          alignment={node.properties.alignment}
          distribution={node.properties.distribution}
        >
          {node.properties.children?.map((child) => (
            <ComponentRenderer
              key={child.id}
              component={child}
              processor={processor}
              surfaceId={surfaceId}
              enableCustomElements={enableCustomElements}
              onAction={onAction}
            />
          ))}
        </Row>
      );
    }

    case 'Column': {
      const node = component as ColumnNode;
      return (
        <Column
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          alignment={node.properties.alignment}
          distribution={node.properties.distribution}
        >
          {node.properties.children?.map((child) => (
            <ComponentRenderer
              key={child.id}
              component={child}
              processor={processor}
              surfaceId={surfaceId}
              enableCustomElements={enableCustomElements}
              onAction={onAction}
            />
          ))}
        </Column>
      );
    }

    case 'List': {
      const node = component as ListNode;
      return (
        <List
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          direction={node.properties.direction}
        >
          {node.properties.children?.map((child) => (
            <ComponentRenderer
              key={child.id}
              component={child}
              processor={processor}
              surfaceId={surfaceId}
              enableCustomElements={enableCustomElements}
              onAction={onAction}
            />
          ))}
        </List>
      );
    }

    case 'Card': {
      const node = component as CardNode;
      const children =
        node.properties.children ?? (node.properties.child ? [node.properties.child] : []);
      return (
        <Card key={node.id} component={node} processor={processor} surfaceId={surfaceId}>
          {children.map((child) => (
            <ComponentRenderer
              key={child.id}
              component={child}
              processor={processor}
              surfaceId={surfaceId}
              enableCustomElements={enableCustomElements}
              onAction={onAction}
            />
          ))}
        </Card>
      );
    }

    case 'Tabs': {
      const node = component as TabsNode;
      const titles = node.properties.tabItems?.map((item) => item.title) ?? [];
      const tabChildren = node.properties.tabItems?.map((item) => (
        <ComponentRenderer
          key={item.child.id}
          component={item.child}
          processor={processor}
          surfaceId={surfaceId}
          enableCustomElements={enableCustomElements}
          onAction={onAction}
        />
      ));
      return (
        <Tabs
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          titles={titles}
        >
          {tabChildren}
        </Tabs>
      );
    }

    case 'Divider': {
      const node = component as DividerNode;
      return (
        <Divider
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          axis={node.properties.axis}
          thickness={node.properties.thickness}
          color={node.properties.color}
        />
      );
    }

    case 'Modal': {
      const node = component as ModalNode;
      return (
        <Modal
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          entryPoint={
            <ComponentRenderer
              component={node.properties.entryPointChild}
              processor={processor}
              surfaceId={surfaceId}
              enableCustomElements={enableCustomElements}
              onAction={onAction}
            />
          }
          content={
            <ComponentRenderer
              component={node.properties.contentChild}
              processor={processor}
              surfaceId={surfaceId}
              enableCustomElements={enableCustomElements}
              onAction={onAction}
            />
          }
        />
      );
    }

    case 'CheckBox': {
      const node = component as CheckboxNode;
      return (
        <Checkbox
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          label={node.properties.label}
          value={node.properties.value}
        />
      );
    }

    case 'TextField': {
      const node = component as TextFieldNode;
      return (
        <TextField
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          label={node.properties.label}
          text={node.properties.text}
          usageHint={node.properties.usageHint}
          validationRegexp={node.properties.validationRegexp}
        />
      );
    }

    case 'DateTimeInput': {
      const node = component as DateTimeInputNode;
      return (
        <DateTimeInput
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          value={node.properties.value}
          enableDate={node.properties.enableDate}
          enableTime={node.properties.enableTime}
        />
      );
    }

    case 'MultipleChoice': {
      const node = component as MultipleChoiceNode;
      return (
        <MultipleChoice
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          value={node.properties.value}
          options={node.properties.options}
          label={node.properties.label}
          usageHint={node.properties.usageHint}
        />
      );
    }

    case 'Slider': {
      const node = component as SliderNode;
      return (
        <Slider
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          value={node.properties.value}
          min={node.properties.min}
          max={node.properties.max}
          label={node.properties.label}
        />
      );
    }

    case 'Chart': {
      const node = component as ChartNode;
      return (
        <Chart
          key={node.id}
          component={node}
          processor={processor}
          surfaceId={surfaceId}
          chartType={node.properties.chartType}
          title={node.properties.title}
          series={node.properties.series}
          xAxis={node.properties.xAxis}
          yAxis={node.properties.yAxis}
          legend={node.properties.legend}
          tooltip={node.properties.tooltip}
          height={node.properties.height}
          width={node.properties.width}
          echartsOption={node.properties.echartsOption}
        />
      );
    }

    default: {
      // 未知组件类型
      if (enableCustomElements) {
        const CustomComponent = componentRegistry.get(component.type);
        if (CustomComponent) {
          return (
            <CustomComponent
              key={component.id}
              component={component}
              processor={processor}
              surfaceId={surfaceId}
              {...component.properties}
            />
          );
        }
      }
      return (
        <div key={component.id} className="a2-br-2 a2-border a2-bc-e30 a2-p-2 a2-c-e50">
          Unknown component type: {component.type}
        </div>
      );
    }
  }
}

export { ComponentRenderer };
