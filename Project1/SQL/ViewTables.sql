select contact.*,
    address.address_type,
    address.address,
    address.city,
    address.state,
    address.zip,
    phone.phone_type,
    phone.area_code,
    phone.phone_number,
    dates.date_type,
    dates.date_value
from contact
    left join address on contact.contact_id = address.contact_id
    left join phone on contact.contact_id = phone.contact_id
    left join dates on contact.contact_id = dates.contact_id;
select *
from contact
    left join phone on contact.contact_id = phone.contact_id
select *
from contact
    left join dates on contact.contact_id = dates.contact_id;
select *
from address
where contact_id = 877;
select *
from dates
where contact_id = 877;