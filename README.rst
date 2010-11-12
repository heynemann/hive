Introduction
============

Hive is an API Server built using NodeJS and Reddis.

Vision
======

Hive aims at providing infra-structure services to API developers, so they can focus on the business aspects of it. It does not impose any constraints on the API as far as programming language or technologies are concerned.

Current Status
==============

In order to create an API today, developers need to worry with distracting aspects such as:

* Security - Authentication and the usage of private/public keypairs;
* Throttling - Possibility of using different strategies to limit usage of the API;
* Metering - Measuring usage by user of the API;
* Logging - Server information as well as API Debugging;
* Reporting - Easy access to information from all of the above;
* Versioning - Allow users to access different versions of the API;
* Documentation - Easy and unified documentation access.

Hive aims at changing that and providing the above and more for API developers.

Roadmap
=======

v0.1 - Genesis
--------------

* Administration interface to register APIs.
* Allowing access to the registered API.

ps: This version does not include any customizations in the API URL.

v0.2 - Authorization
--------------------

* Allow users to request public/private keypair associating to their e-mail address;
* Validation of the public key and the MD5 hash of the private key when users call the API;
* Administration interface that allows the API developer to select if they want private/public keypair authorization.

v0.3 - Authentication
---------------------

* Allow the registering of new authentication providers in Hive, via configuration;
* Allow API developers to specify one or more authentication providers in the administration;
* If any authentication provider was selected, enforce it in the API usage.

v0.4 - Throttling
=================

* Allow the registering of throttling strategy providers in Hive, via configuration;
* Allow the API developer to specify one strategy of throttling and its parameters (requests/day, kbyte limits per day, etc);
* Validate if the user requesting the API is valid according to the given throttling strategy for the given API.

Proposed Technology Stack
=========================

* NodeJS - http://nodejs.org/
* ExpressJS - Sinatra-like framework - http://expressjs.com
* Redis - Key-Value Storage - http://code.google.com/p/redis/

To know more about the technology stack, read the requirements.txt file.

Status
======

NOT AVAILABLE.

As you can see from the codebase, not much has been done so far.

We'll keep this document up-to-date with the latest developments.

Team Behind Hive
================

Bernardo Heynemann (@heynemann) - github: heynemann

Fábio Costa (@fabiomcosta) - github: fabiomcosta
