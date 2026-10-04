-- -- - Which columns in cd.bookings are foreign keys, and which tables do they point to?
-- facid and memid, point to cd.facilities and cd.members.

-- -- - What kind of relationship is there between members and facilities? Which table plays the role of the junction table, like student_courses in the video?
-- members and facilities have a many-to-many relationship, cd.bookings is the junction table

-- -- - The recommendedby column in cd.members points back to cd.members itself. What kind of relationship is that?
-- one-to-many, one member can recommend mant other members, while one member can only be recommended by at most one other member.


-- Retrieve the start times of members' bookings
select bookings.starttime from cd.bookings
inner join cd.members on members.memid = bookings.memid
where members.firstname= 'David' and members.surname= 'Farrell';  

-- Work out the start times of bookings for tennis courts
select cd. bookings.starttime as start, cd.facilities.name as name
from cd.facilities
inner join cd.bookings on facilities.facid = bookings.facid 
where facilities.name in ('Tennis Court 2','Tennis Court 1') and
bookings.starttime >= '2012-09-21' and bookings.starttime < '2012-09-22'
order by bookings.starttime;  

-- Produce a list of all members who have recommended another member
select distinct recs.firstname as firstname, recs.surname as surname
from cd.members mems
inner join cd.members recs
    on recs.memid = mems.recommendedby
order by surname, firstname;

-- Produce a list of all members, along with their recommender
select mems.firstname as memfname, mems.surname as memsname, recs.firstname as recfname, recs.surname as recsname
from cd.members mems
left outer join cd.members recs on recs.memid = mems.recommendedby
order by memsname, memfname;          

-- Produce a list of all members who have used a tennis court
select distinct mems.firstname || ' ' || mems.surname as member, facs.name as facility
	from 
		cd.members mems
		inner join cd.bookings bks
			on mems.memid = bks.memid
		inner join cd.facilities facs
			on bks.facid = facs.facid
	where
		facs.name in ('Tennis Court 2','Tennis Court 1')
order by member, facility          

-- Produce a list of costly bookings
select mems.firstname || ' ' || mems.surname as member, facs.name as facility, 
case when mems.memid = 0 then
bks.slots*facs.guestcost else
bks.slots*facs.membercost
end as cost
from cd.members mems                
inner join cd.bookings bks on mems.memid = bks.memid
inner join cd.facilities facs on bks.facid = facs.facid
where
bks.starttime >= '2012-09-14' and 
bks.starttime < '2012-09-15' and (
(mems.memid = 0 and bks.slots*facs.guestcost > 30) or
(mems.memid != 0 and bks.slots*facs.membercost > 30)
)
order by cost desc;          

-- Produce a list of all members, along with their recommender, using no joins
select distinct mems.firstname || ' ' ||  mems.surname as member,
(select recs.firstname || ' ' || recs.surname as recommender 
from cd.members recs 
where recs.memid = mems.recommendedby
)
from cd.members mems
order by member;       

-- Produce a list of costly bookings, using a subquery
select member, facility, cost from (
	select 
		mems.firstname || ' ' || mems.surname as member,
		facs.name as facility,
		case
			when mems.memid = 0 then
				bks.slots*facs.guestcost
			else
				bks.slots*facs.membercost
		end as cost
		from
			cd.members mems
			inner join cd.bookings bks
				on mems.memid = bks.memid
			inner join cd.facilities facs
				on bks.facid = facs.facid
		where
			bks.starttime >= '2012-09-14' and
			bks.starttime < '2012-09-15'
	) as bookings
	where cost > 30
order by cost desc;      