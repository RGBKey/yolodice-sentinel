# Concept
This project aims to take the difficulty and work out of verifying bets. With a third-party service verifying bets independently of the site, less trust is needed. Provable fairness has always been fair and trustless, however it requires work from the user, and as a direct consequence of that, many do not take advantage of it.

As a rough roadmap, the plan is for the project to be implemented in two stages.

## Stage 1

### The Plan
In the beginning, the service will require nothing more from the user than their user ID. The service will use this to list the user's seeds and bets, and to verify all their bets retroactively. In addition, the service will then monitor all their bets as they occur. Should a discrepency be found, the service would alert that user (and all other users preferrably) that something went wrong. (The method through which this alert would be sent is still undecided). It is important that the verification engine is bulletproof so as not to produce false positives.

This is not a perfect plan. Bets in the past could have possibly been altered by the site (theoretically), making them appear as if they were fair. A high could have been changed to a low somewhere, other "dummy" bets could have been added. This method works best on bets made after the service has begun monitoring that user's activity. As the service will monitor the user going forward, it will keep track of all their bets, and their outcomes, as well as the seed info in a database. This way, if anything were to change, it would be noticed.

As the number of bets made with a seed increases, the difficulty in finding a server secret that produces the same n bets increases exponentially. Since a bad server would have to brute force hashes of the type used by the provably fair system (HMAC-SHA512) this gets computationally expensive quick. For example, the expected number of hashes required to find a server seed that produces the same number of bets `n` as some other server seed is provided by this formula:

![Formula](./formula_1.png)

**How does this help us?** This means that to find another server seed that matches more than a few dozen bets is near impossible. Meaning that even if when periodically polling the site for a user's bets, if the user has made bets already, we can still assume that the server isn't fooling us as long as the later revealed server seed matches the hash.

### The End Result
So now we know that we can verify a user's bets to a pretty high degree of certainty. But how can we raise that degree of certainty even higher?

## Stage 2

### A Different Approach
Here, we do practically the same thing as before. We still poll the user's bets and verify them when the seed is revealed. However, this time we do a little bit more for the user. In this scenario, we get an API key from the user. This API key would probably use the `play` permission, however in the future it might be possible to use a more restrictive permission that doesn't give the service access to methods it doesn't need access to.

What methods do we need access to?
- `read_bet`: This allows us to see a bet's outcome for the user we are verifying, *even if that user has hidden their stats*.
- `list_bets`: This allows us to list the bets for the user so we can read them in order to verify them.
- `create_seed`: This part here is the key, as it allows us to **create, record and verify the seeds for the user automatically**.

Using an API key provided by the user instead of using the general API key for the service will allow us to do two important things:
1. See the user's bets, even if they have marked their stats/bets private. If we can't see the bets, we can't verify them.
2. Change their seed for them. After all, if you never reveal the server seed, you can't verify your bets.

This way, users can still have their bets verified automatically by the service even if they choose to make their stats private. Additionally, automatic seed changing will be an **opt-in** feature. If a user signs up for the service and doesn't realize it is the service changing their seed and not the site, it could lead to confusion and anger, the opposite of what this project is designed for.

## Other remarks
This service cannot be perfect. There are possibly side-channel attacks to provably fair that haven't been thought about. However, this project aims to get more users verifying their bets.

It is possible with access to other methods through the API (namely account history) that deposits, withdraws, tips and bonuses could be made available to the service. These could be used, in combination with the verified bets to be able to exactly calculate what the user's balance should be. This should allow the user to verify with a higher degree of certainty that the site is being fair. However, this should never come at the cost of user privacy, so all of these additional features would be opt-in only.

Finally, this is just an idea. I could very well have missed any minor or major point here that would invalidate the whole purpose of this. But I think that this could also be a huge step towards bringing players more peace of mind.