import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  // eslint-disable-next-line no-unused-vars
  as: Component = 'button',
  className = '',
  ...props
}) {
  return (
    <Component
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
