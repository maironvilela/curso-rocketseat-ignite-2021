import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
// import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const toast = useToast();

  const { errors } = formState;

  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  function validateImageSize(image: File): string | undefined {
    try {
      if (image.size > 10_000_000) {
        throw new Error('O arquivo deve ser menor que 10MB');
        // return 'O arquivo deve ser menor que 10MB';
      }
    } catch (err) {
      toast({
        title: 'Imagem não adicionada',
        description: err.message,
      });
    }
    return undefined;
  }

  function validateAcceptedFormats(image: File): string | undefined {
    try {
      const regex = new RegExp(/image\/(jpeg|png|gif)/);
      const isFormatValid = regex.test(image.type);
      if (!isFormatValid) {
        throw new Error('Somente são aceitos arquivos PNG, JPEG e GIF');
      }
    } catch (err) {
      toast({
        title: 'Imagem não adicionada',
        description: err.message,
      });
    }
    return undefined;
  }

  const formValidations = {
    image: {
      /*  required: {
      message: 'Arquivo obrigatório',
      value: true,
    }, */
      validate: {
        lessThan10MB: (value: File[]) => validateImageSize(value[0]),
        acceptedFormats: (value: File[]) => validateAcceptedFormats(value[0]),
      },
    },
    title: {
      required: {
        message: 'Titulo obrigatório',
        value: true,
      },
      minLength: {
        message: 'Deve ter no mínimo 2 caracteres',
        value: 2,
      },
      maxLength: {
        message: 'Deve ter no máximo 20 caracteres',
        value: 20,
      },
    },
    description: {
      required: {
        message: 'Descrição obrigatório',
        value: true,
      },

      maxLength: {
        message: 'Deve ter no máximo 65 caracteres',
        value: 65,
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: { title: string; description: string; url: string }) => {
      return api.post('api/images', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['images']);
      },
    }
  );

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
        });
        return;
      }
      // TODO EXECUTE ASYNC MUTATION
      await mutation.mutateAsync({
        title: data?.title as string,
        description: data?.description as string,
        url: imageUrl,
      });
      // TODO SHOW SUCCESS TOAST
      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
      });
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
