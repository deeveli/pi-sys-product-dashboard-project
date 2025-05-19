import Balancer from 'react-wrap-balancer'

import Icons from '@/components/icons'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const ProductList = () => {
  return (
    <section id="features" className={cn('')}>
      <div
        className={cn(
          'bg-white flex h-fit w-full flex-col items-center justify-start',
          'rounded-lg p-4 space-y-4',
          'text-primary',
        )}
      >
        table list with pagination
      </div>
    </section>
  );
}

export default ProductList;
