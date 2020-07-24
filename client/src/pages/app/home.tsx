import { Title } from '../../components/Title'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ChatAtom, RestaurantAtom, ShareAtom } from '../../atoms/Atoms'
import { api } from '../../utils/api'
import { home } from '../../styled'
import { rem, rgba, rgb } from 'polished'
import type { PanInfo, Transition } from 'framer-motion'
import type { Place, RestaurantResult } from '../../types/types'

type DragEvent = MouseEvent | TouchEvent | PointerEvent


export default () => {
  const router = useRouter()

  const chats = useRecoilValue(ChatAtom)
  const setShareContent = useSetRecoilState(ShareAtom)
  const setRestaurant = useSetRecoilState(RestaurantAtom)

  const [expand, setExpand] = useState(false)
  const toggleExpand = () => setExpand(!expand)

  const sheetRef = useRef<null|HTMLDivElement>(null)
  const [overscrolled, setOverscrolled] = useState(false)

  // use placholders to minimize api calls to Yelp
  const placeholderPlaces = [
    { label: 'Kibane', event: 'Join us for some traditional Japanese eats every Thursday! The chefs will be serving up some of your favorite Sushi!', img: 'https://images.unsplash.com/photo-1562436260-8c9216eeb703?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&q=80&auto=format&fit=crop&w=800&h=500', reviews: [] },
    { label: 'Shacky Shakes', event: "Join the Shackers for dinner on Sundays! The Shackers is a casual (and gluten-free) classic dining experience in New York City's East Village.", img: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&q=80&auto=format&fit=crop&crop=top&w=800&h=500', reviews: [] },
    { label: 'Jinyo', event: "We'll be hosting a mukbang conference every Monday! Meet one of the most knowledgeable mukbang coaches!", img: 'https://images.unsplash.com/photo-1568096889942-6eedde686635?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&q=80&auto=format&fit=crop&w=800&h=500', reviews: [] }
  ]
  const defaultEvent = "We'll be hosting a mukbang conference every Monday! Meet one of the most knowledgeable mukbang coaches!"

  const [places, setPlaces] = useState<Place[]>(placeholderPlaces)
  const [search, setSearch] = useState(encodeURIComponent('Quebec & Terminal'))
  const [searchMode, setSearchMode] = useState(false)

  const handleSearch = async (e: any) => {
    if ( e.key === 'Enter' ) {
      setSearchMode(true)
      setSearch(encodeURIComponent( e.target.value ))
      const { results }: { results: RestaurantResult[] } = await api.post( 'op/search-restaurants', { search: e.target.value } )
      setPlaces(results.map(({ name, photos, url, reviews }) => ({ label: name, img: photos[0], url, reviews })))
    }
  }

  const handleDragEnd = (_: DragEvent, { delta: { y } }: PanInfo) => {
    y < 0 ? setExpand(true) : y > 0 ? setExpand(false) : toggleExpand()
  }

  let vw = 0
  let vh = 0
  if (typeof window !== 'undefined') {
    vw = document.body.clientWidth
    vh = document.body.clientHeight
  }

  const { top, bottom, mid } = { top: 50, bottom: vh - (42 + 56), mid: vh - (150) }

  const sheetTransition: Transition = {
    default: {
      type: 'spring',
      stiffness: 500,
      damping: 37,
      mass: 1,
      velocity: 0
    },
    opacity: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeOut'
    },
    backgroundColor: {
      type: 'tween',
      delay: expand ? 0.15 : 0,
      duration: 0.15,
      ease: 'easeOut'
    },
    boxShadow: {
      type: 'tween',
      delay: expand ? 0.1 : 0,
      duration: 0.2,
      ease: 'easeOut'
    }
  }


  const [segment, setSegment] = useState<null|number>(null)
  const [button, setButton] = useState<null|number>(null)
  const [shareItem, setShareItem] = useState<null|number>(null)

  const handleShare = async (i: number, text: string, event: string) => {
    setShareItem(i)
    const content = `Let's go to the event at ${text}!\n\nHere are the deets: "${event}"`
    setShareContent({ content })
    // await navigator.clipboard.writeText( content )
  }


  return (
    <>
    <Title>Home</Title>
    <home.banner
      animate
      transition={sheetTransition}
      expanded={expand}
    >
      <home.searchIcon viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </home.searchIcon>
      <home.searchBar
        animate={{ boxShadow: expand ? `0 0rem 0rem 1px ${rgba(0,0,0,0.2)}` : `0 0.15rem 0.5rem 0px ${rgba(0,0,0,0.2)}` }}
        transition={sheetTransition}
        placeholder='Search'
        onKeyDown={handleSearch} />
    </home.banner>
    <home.container>
      <home.map
        src={`
          https://www.google.com/maps/embed/v1/search
          ?q=${search}+in+Vancouver+BC
          &zoom=13
          &key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY}
        `.replace( /\s/g, '' )}/>
      <home.sheet
        expanded={expand}
        initial={false}
        animate={{ y: (searchMode && !expand) ? mid : expand ? top : bottom }}
        transition={sheetTransition}
        drag='y'
        dragConstraints={{ top, bottom }}
        onDragEnd={handleDragEnd}
        ref={sheetRef}
        // @ts-expect-error
        // inferred type of target does not have scrollTop property
        onScroll={e => e.target.scrollTop > 0 ? setOverscrolled(true) : setOverscrolled(false)}
      >
        <home.sheetThumbContainer 
          onTap={_ => { toggleExpand(); if (sheetRef.current) sheetRef.current.scrollTop = 0}}
          animate
          overscrolled={overscrolled}>
          <home.sheetThumb />
        </home.sheetThumbContainer>
        <home.sheetHeader>{searchMode ? 'Search Results' : 'Explore Local Cuisines'}</home.sheetHeader>
        <home.sheetContent>
        {places.map( ({ label, event, img, url, reviews },i) =>
          <home.sheetItemContainer key={i}>
            <home.sheetItem>
              <home.sheetLabel>{label}</home.sheetLabel>
              <home.sheetImg src={img} />
            </home.sheetItem>
            <home.sheetItemDetailsContainer
              onTapStart={_ => setSegment(i)}
              initial={{ opacity: 0 }}
              animate={(segment === i) ? { opacity: 1 } : { opacity: 0 }}
              transition={home.sheetItemTransition}
              >
              <home.sheetItemClose
                onTap={_ => setSegment(null)}
                revealed={segment === i}
                whileTap={{ scale: 0.8 }}
                viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </home.sheetItemClose>
              <home.sheetItemOpen
                onTap={_ => {
                  setRestaurant({ img, event: event ?? defaultEvent, reviews });
                  router.push( '/app/restaurants/[restaurant]', `/app/restaurants/${label}` )
                }}
                revealed={segment === i}
                whileTap={{ scale: 0.8 }}
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 16 12 12 8"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </home.sheetItemOpen>
              <home.sheetItemShare
                onTap={_ => handleShare(i,label,event ?? url ?? '')}
                revealed={segment === i}
                initial={{ scale: 1 }}
                animate={ shareItem === i ? { scale: 0.8 } : { scale: 1 }}
                transition={home.sheetItemTransition}
                viewBox="0 0 24 24">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </home.sheetItemShare>
              <home.sheetItemEvent>
                <home.sheetItemEventInfo>{event ?? defaultEvent}</home.sheetItemEventInfo>
                <home.sheetItemEventButton
                  onTap={_ => setButton(i)}
                  revealed={segment === i}
                  initial={{ backgroundColor: '#FFF', color: '#6988F2' }}
                  animate={(button === i) ? { backgroundColor: '#6988F2', color: '#FFF' } : { backgroundColor: '#FFF', color: '#6988F2' }}
                  transition={home.sheetItemTransition}
                >
                  {(button === i) ? '✅' : 'RSVP'}
                </home.sheetItemEventButton>
              </home.sheetItemEvent>
            </home.sheetItemDetailsContainer>
          </home.sheetItemContainer>
        )}
        </home.sheetContent>
      </home.sheet>
      <home.shareSheet
        initial={{ y: rem(0) }}
        animate={(typeof shareItem === 'number') ? { y: '-12.3rem' } : { y: rem(0) }}
        transition={sheetTransition}
      >
        <home.shareRow>
        {chats?.length ?
          chats.map(({ id, recipient }, i) =>
            <Link href='/app/conversations/[chat]' as={`/app/conversations/${id}`} key={i}>
              <home.shareImg src={recipient?.profilePicture}/>
            </Link>
          )
          :
          <home.shareRowLoadingTagline>Start a Conversation to Share 👉</home.shareRowLoadingTagline>
        }
        </home.shareRow>
        <home.shareSheetClose
          onTap={_ => setShareItem(null)}
          viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </home.shareSheetClose>
      </home.shareSheet>
    </home.container>
    </>
  )
}
