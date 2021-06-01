*Conceitos:

1 - Branch: Versões diferentes do meu sistema, aplicação, etc.
    
    1.1 - Master: É a branch principal

2 - Commit: É qualquer alteração que é feita no sistema e enviada para o git
onde ele irá armazenar apenas a alteração que foi feita.

    2.1 - 

*Comandos:

git status: Verifica o que foi alterado no sistema

git add nomedoarquivo: Adiciona as modificações ao git

    -> git add -A: adiciona todos as alterações ao git


git commit -m "SuaMensagem": Envia as alterações para o git com uma mensagem

    -> git commit -am: Adiciona todas as alterações ao git e as envia


git log: Visualiza todos os commits

git branch: Lista todos os branchs do projeto

git reset: volta a um commit desejado (usar o id do commit)

    -> git reset --soft: volta a um commit desejado antes das alterações mas mantendo as alterações dos commits posteriores com o git add já dado, ou
    seja como se fosse só commitar novamente.
    
    -> git reset --mixed: mesmo esquema do soft só que será necessário usar o git add novamente
    
    -> git reset --hard: volta ao commit desejado mas exclui todos os outros commits posteriores(exclui tudo, como se nunca tivesse feito alteração)

    
git revert: envia um commit que desfaz as alterações mas não as perde.

    -> git revert --no-edit: não irá abrir o editor para corrigir as alterações


git branch nomedobranch: cria um novo branch

git checkout nomedobranch: entra no branch desejado

git diff: mostra as altera feitas em todos os arquivos de forma detalhada

    -> git diff --name-only: mostra o nome dos arquivos que foram modificados
    
    -> git diff nomedoarquivo: mostra as altera feitas no arquivo de forma detalhada
    
    
git checkout HEAD -- nomedoarquivo: volta o arquivo ao estado original do branch atual

git push origin seubranch: envia as alterações para o repositorio remoto

git pull origin seubranch: traz as alterações do remoto para o local


*.gitignore: arquivo no qual listamos os arquivos que o git irá ignorar tanto no repositorio local e remoto

*Deletando branch:

    -> branch remoto -> push origin :nomedobranch
    -> branch local -> git branch -D nome do branch
    