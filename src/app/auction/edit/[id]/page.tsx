import AuctionForm from '@/components/AuctionViewForm'

interface Props {
  params: { id: string }
}

export default function EditAuctionPage({ params }: Props) {
  return <AuctionForm mode="edit" auctionId={params.id} />
}
