# Technova kundtjänstbot

## Uppgiften

Uppgiften gick ut på att utveckla en AI-baserad kundsupportassistent för ett fiktivt företag som säljer teknikprodukter online. Assistenten ska kunna svara på kundfrågor om produkter, leveranser och garantier genom att hämta information från företagets FAQ- och policydokument.

## Kravspecifikation

Det ska finnas ett gränssnitt för att skriva till boten och ställa frågor. Boten ska ha ett minne, men inget krav att komma ihåg över sessioner. Boten får endast svara på frågor från dokumentet som finns upplagt i veckordatabasen, frågas något annat ska boten svara att den inte vet, på ett vänligt sätt. Boten ska även referera till vilken punkt i dokumentet den hämtat information ifrån.

Tekniska krav bestod av att använda React med Langchain.js, specifikt funktionerna PromptTemplate, RunnableSequence och Retriever. Vi skulle även använda oss av Supabase för att spara databasen, samt Ollama.

Screenshot på databasen finns [här](https://github.com/ninerino/ai-exam-technova/blob/main/technova.png).

## Extra krav för VG

För att få VG så skulle vi utöver ovanstående krav dela upp koden så att langchain.js är skiljt från React-komponenterna, det vill säga modulärt. Utöver detta skulle vi använda oss av en funktion som finns i Langchain.js som vi inte gått igenom under kursen.

### MultiQueryRetriever och ContextualCompressionRetriever - funktioner jag ville använda

Jag ville använda mig utav antingen MultiQueryRetriever eller ContextualCompressionRetriever - eller båda - i mitt projekt, men på grund av att langchain.js ständigt uppdateras och precis släppt 1.0, så fastnade jag i ett dependency hell som inte gick att lösa under tidsramen för uppgiften. Jag hade velat använda MultiQueryRetriever då jag tycker att det är smart att be LLM:en att omformulera frågorna på olika sätt för at maximera chansen att få ett svar, oberoende av hur kunden ställer frågan.

ContextualCompressionRetriever hade varit bra då den kompressar dokumenten innan det skickar in till LLM, vilket hade sänkt tokenkostnaden utan att för den sakens skull försämra svaret.

### ConsoleCallbackHandler - funktionen jag faktiskt använde

Till slut landade jag på en funktion som inte hjälper användaren utan mig som utvecklare - ConsoleCallbackHandler. Jag valde denna funktion för att hjälpa mig som utvecklare se exakt hur varje steg i kedjan utförs, får jag ett fel någonstans i kedjan så ser jag direkt vart felet ligger. Dessutom tycker jag det är intressant att få information om antalet tokens som används, vilket inte är helt ointressant i AI-utveckling.

## Användning av AI-hjälpmedel i denna uppgift

Jag har använt chatGPT för två saker.
- Förklaring av koncept som jag haft svårt att förstå genom att bara läsa dokumentation
- En regex-kodsnutt som finns i /packages/base/message/ui/index.jsx, tydligt uppmärkt.
