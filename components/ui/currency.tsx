const formatPrice = new Intl.NumberFormat ("en-US", {
      style: "currency",
      currency: "USD",
})

interface CurrencyProps {
    value?: string | number;
}

const Currency:React.FC<CurrencyProps> = ({
    value
}) => {
  return (
    <div className="font-semibold">
        {formatPrice.format(Number(value))}
    </div>
  )
}

export default Currency