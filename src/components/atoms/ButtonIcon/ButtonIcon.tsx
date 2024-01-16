import cn from 'classnames'

import IconWrapper from '@/src/components/atoms/IconWrapper/IconWrapper'
import LoaderQuery from '@/src/components/atoms/LoaderQuery/LoaderQuery'

import { ButtonIconTypes } from './_types'
import styles from './ButtonIcon.module.scss'

/** компонент кнопки с иконкой */
const ButtonIcon: React.FC<ButtonIconTypes> = ({
  as: Tag = 'button',
  className,
  colorVariant,
  disabled,
  icon: Icon,
  iconWrapperClassName,
  isLoadingAfterClick,
  label,
  labelClassName,
  onClick,
  paddingVariant = 'wide',
  type,
  withIcon = true
}) => (
  <Tag
    className={cn(styles.wrapper, styles[`color_${colorVariant}`], styles[`padding_${paddingVariant}`], className)}
    disabled={disabled}
    onClick={onClick}
    title={label}
    {...{
      ...Object.assign({}, Tag === 'button' && { type: type || 'button' })
    }}
  >
    {withIcon && (
      <IconWrapper
        IconComponent={Icon}
        wrapperClassname={cn(styles.iconWrapper, iconWrapperClassName)}
      />
    )}
    <LoaderQuery
      className={styles.loader}
      isLoading={isLoadingAfterClick}
    >
      <span className={cn(styles.labelClassName, labelClassName)}>
        {label}
      </span>
    </LoaderQuery>
  </Tag>
)

export default ButtonIcon
