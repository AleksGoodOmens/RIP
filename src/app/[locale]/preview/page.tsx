import { Metadata } from 'next';

import { InputField, Text } from '@/components';
import { Button } from '@/components/ui';

import { ClientPreview } from './ClientPreview';

export const metadata: Metadata = {
  title: 'Preview - JustCodeIt',
};

const PreviewPage = () => {
  return (
    <div className="p-4">
      <ClientPreview />
      <div className="p-4">
        <Text size={'xl'} as={'h1'}>
          Text h1
        </Text>
        <Text size={'lg'}>Text h2</Text>
        <Text size={'md'} align={'center'} as={'h3'}>
          Text center md
        </Text>
        <Text size={'sm'} weight={'bold'} as={'h4'}>
          Text center sm bold
        </Text>
        <Text size={'xs'} align={'right'}>
          Text xs right{' '}
        </Text>
      </div>

      <div className="p-4">
        <Button variant={'default'}>default</Button>
        <Button variant={'link'}>link</Button>
        <Button variant={'destructive'}>destructive</Button>
        <Button variant={'ghost'}>ghost</Button>
        <Button variant={'outline'}>outline</Button>
        <Button variant={'secondary'}>secondary</Button>
      </div>
      <div className="p-4">
        <InputField label="default state" />
        <InputField label="disabled state" disabled />
        <InputField label="with helper text" helperText="this is helper text" />
        <InputField label="error state" error="this is error" />
        <InputField type="email" placeholder="Email" label="Email" />
      </div>

      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora nemo maxime iure
        necessitatibus fuga harum placeat nobis, voluptatem perferendis reiciendis omnis in?
        Sapiente hic, laboriosam error, velit quasi sequi quae libero ut expedita voluptate ipsam
        itaque mollitia beatae. Autem est, fugit fuga, porro adipisci ad voluptate alias accusantium
        similique quis libero temporibus eligendi, quibusdam dolore? Suscipit quibusdam ipsa impedit
        doloribus fuga, quisquam iure ex perspiciatis odio sint quas ducimus nesciunt. Aliquam
        accusantium minima consequatur, nisi corrupti harum quisquam in blanditiis esse error
        aperiam sed accusamus molestias quod neque eveniet itaque, quos vel iusto modi veritatis?
        Non enim voluptatum quo accusantium! Hic accusantium ab sed delectus quisquam consequuntur!
        Aliquid, eos! Id quam accusantium at, explicabo sunt omnis animi enim blanditiis. Veniam
        voluptas praesentium illo aliquid eius sapiente autem? Quas corrupti, quo rerum accusantium
        maiores vero perferendis sequi perspiciatis sit asperiores, aspernatur a veritatis illum
        magni necessitatibus sint fugit aut voluptatum odit ducimus, incidunt soluta consequatur.
        Excepturi corrupti laborum quas minima quibusdam possimus vitae enim, consequuntur
        consequatur animi dolor autem mollitia eveniet magni? Aliquam nobis, sequi corporis ratione
        quibusdam in doloribus, dolore vero obcaecati iste ullam consequuntur id voluptates labore?
        Repellendus, non! Officiis possimus reprehenderit alias, temporibus qui dolore est
        consectetur ipsa eum eveniet neque ut excepturi sunt in perspiciatis quam ea adipisci fuga
        voluptatibus nulla error, laboriosam iure quasi iste! Quasi expedita ullam eaque.
        Dignissimos nostrum quisquam error iure quibusdam exercitationem labore mollitia et
        sapiente, doloremque earum? Autem sapiente voluptatibus impedit labore voluptatem nam
        asperiores! Repudiandae quo reiciendis cum tempora quam incidunt vel maxime obcaecati
        deserunt accusamus quisquam excepturi ipsam tenetur harum ex consequatur eligendi asperiores
        quos quis eius, officia autem quaerat distinctio et. Sint temporibus nostrum, qui quia eaque
        dolorum quod dicta atque doloribus exercitationem optio. Adipisci delectus eos at,
        laudantium eius alias. Rerum dolor necessitatibus reiciendis et molestias quam debitis
        facere pariatur ab doloribus, aliquid corrupti nobis expedita inventore. Nobis molestias
        reiciendis, molestiae amet dolor accusantium error animi accusamus aperiam ut autem eius
        asperiores, minima repellat voluptates? Distinctio ad ipsa in? Nam, fugit cum hic harum
        error aperiam, obcaecati quae facere quisquam placeat praesentium odio quia veritatis illum
        dignissimos eum illo voluptas reprehenderit quo consequatur dolorum laborum. Dolores
        molestias consectetur quisquam. Hic impedit architecto qui quibusdam, maiores eligendi,
        accusamus tenetur natus, dolorem vel nisi nesciunt praesentium distinctio deserunt sunt. Cum
        incidunt laudantium atque nisi rem doloremque quos delectus neque et soluta libero
        aspernatur, facere quod reiciendis reprehenderit veritatis natus non debitis officiis
        nesciunt. Fuga sunt quos quibusdam illo incidunt, iure impedit obcaecati doloremque
        accusamus repudiandae ab laborum nostrum debitis quis accusantium doloribus. Similique,
        officiis laboriosam autem quia necessitatibus praesentium eveniet neque doloremque.
        Praesentium magni doloribus consectetur perspiciatis eum dignissimos quidem quos asperiores
        in maxime natus debitis vel perferendis quas iure omnis, quia soluta delectus ratione,
        impedit sint quibusdam ab ipsam voluptatum! Animi voluptatum delectus nulla, beatae esse
        repudiandae illo quam exercitationem! Iusto, rem placeat possimus earum veniam perferendis
        quae facilis reiciendis deserunt quibusdam eos sit voluptatem illum porro corrupti.
        Repudiandae quo fugit odio quia fugiat autem, nemo asperiores quidem, veniam molestias
        tenetur recusandae enim ipsa. Beatae laborum cumque fuga tenetur, repellat non corrupti
        distinctio perspiciatis quam nesciunt eius? Natus, numquam reiciendis molestias placeat vel
        unde, accusamus neque omnis sequi cum earum aperiam perferendis, est reprehenderit rem
        officia? Beatae aliquam obcaecati vitae deleniti unde architecto, rerum, iusto assumenda
        dolorem exercitationem iste reiciendis possimus debitis aliquid ipsum dignissimos nostrum
        magni optio cum doloremque aspernatur. Perspiciatis doloribus consectetur saepe sunt, dicta,
        blanditiis dolore tempore fugiat numquam veniam fuga? Dolores asperiores sint laboriosam
        ipsum itaque. Voluptatibus sed eos odio. Nihil, in! Suscipit, laborum maxime soluta vitae
        optio, numquam quam cupiditate culpa deserunt tempore repellendus expedita incidunt aut
        sapiente saepe aspernatur, eligendi earum ullam hic velit. Quibusdam molestiae magni cum,
        aliquid ducimus facere quia! Laudantium eligendi at, quas reiciendis repellat maiores
        tempora officiis optio provident dolor quaerat fugiat est dolore veniam blanditiis ea eaque
        officia magnam consequuntur veritatis nisi suscipit neque! Nostrum eligendi a quidem
        possimus repellendus maiores quam debitis voluptatibus id ducimus asperiores vitae illo
        nulla, fugit quis quasi consequuntur mollitia deserunt. Hic iure vel quis beatae accusamus
        repellendus commodi quaerat mollitia accusantium debitis animi, saepe alias id itaque porro
        nihil, magni dignissimos quos facere fugiat, delectus atque distinctio! Eligendi quod esse
        reprehenderit ad aspernatur corrupti adipisci explicabo facilis voluptate nihil tenetur
        possimus cum omnis qui, magni, obcaecati consequatur odit recusandae perferendis quam
        dolorum porro aut assumenda maiores. Consectetur repellendus atque non a mollitia fugit
        maiores ipsam repellat culpa minus aperiam dolorum quibusdam deleniti consequatur corporis,
        nostrum tempora voluptatum ducimus blanditiis nobis ratione placeat quidem accusantium! Iure
        consectetur aperiam, maxime laudantium adipisci rerum similique porro deleniti nisi ipsum
        suscipit voluptates necessitatibus quisquam libero eum vitae modi quo. Exercitationem fuga
        qui perferendis reprehenderit ipsum maxime soluta quasi similique dolorem doloribus incidunt
        dolores accusantium odio, nemo voluptatibus praesentium voluptates alias error adipisci
        accusamus? Cum error, sapiente cupiditate magni at laudantium, ea soluta quas neque quos
        nihil magnam. Soluta, quo nemo quam dicta expedita ex maiores, facere repellendus nobis
        cumque exercitationem deserunt architecto quaerat, saepe sit. Harum explicabo beatae cum
        sint, nisi amet, quisquam totam fugiat architecto exercitationem odit aliquid magnam
        recusandae enim eius velit expedita consectetur error culpa assumenda. Vitae placeat ducimus
        ullam eius possimus doloremque deleniti corporis nostrum totam voluptates iure neque illo
        voluptatibus vero quidem exercitationem, sint unde eligendi tempore nobis numquam, a quam.
        Dicta eveniet minus unde quidem, quas sequi voluptates adipisci animi nostrum minima
        quisquam alias quos nisi. Perspiciatis unde, impedit repellendus saepe voluptate consectetur
        voluptates porro, voluptatum eligendi quasi dolorem nesciunt repudiandae doloribus minima
        neque quae nihil reprehenderit rerum! Necessitatibus repellendus officia nihil illo, quas
        facere aliquid eaque eum atque dolore. Sunt tempora explicabo eius eos hic quo atque dolor,
        totam nam voluptate ducimus dolorem rerum fuga nobis doloribus rem perspiciatis voluptates
        id architecto! Voluptatibus laborum quis, minima quae maiores pariatur, voluptatum magnam ab
        illo dicta repellendus suscipit. Odit unde deserunt quia quibusdam, officia exercitationem
        expedita labore itaque, velit illum tempore blanditiis corrupti quasi maiores nostrum dolor
        odio, perferendis dolorem ipsum accusantium consequuntur ea vero? Quisquam sequi quia
        perspiciatis saepe?
      </Text>
    </div>
  );
};
export default PreviewPage;
